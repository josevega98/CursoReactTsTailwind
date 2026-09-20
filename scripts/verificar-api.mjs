import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

// Prueba de integración real. No imprime claves ni tokens.
const env = Object.fromEntries(readFileSync(new URL("../.env.local", import.meta.url), "utf8")
  .split(/\r?\n/).filter((line) => line.includes("=") && !line.startsWith("#"))
  .map((line) => { const index = line.indexOf("="); return [line.slice(0, index), line.slice(index + 1)]; }));
const url = env.VITE_SUPABASE_URL;
const publicKey = env.VITE_SUPABASE_PUBLISHABLE_KEY;
assert(url && publicKey, "Falta .env.local");

const clients = [0, 1].map(() => createClient(url, publicKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: { fetch: (input, init) => fetch(input, { ...init, signal: AbortSignal.timeout(15_000) }) },
}));
const sessions = [];
let createdId;
async function request(path, token, options = {}) {
  return fetch(`${url}/rest/v1/${path}`, {
    ...options,
    signal: AbortSignal.timeout(15_000),
    headers: {
      apikey: publicKey,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...options.headers,
    },
  });
}

try {
  for (const client of clients) {
    const { data, error } = await client.auth.signInAnonymously();
    assert(!error, error?.message);
    assert(data.session?.access_token, "Falta el JWT del usuario de práctica");
    sessions.push(data.session);
  }
  const [a, b] = sessions;
  const noAuth = await request("citas?select=id", null);
  assert.equal(noAuth.status, 401, "La tabla debe requerir usuario autenticado");
  console.log("OK: sin Bearer Token no se leen citas.");

  const initial = await request("citas?select=id", a.access_token);
  assert(initial.ok);
  assert.deepEqual(await initial.json(), []);
  console.log("OK: una sesión nueva recibe empty (200 + []).");

  const created = await request("citas", a.access_token, {
    method: "POST", body: JSON.stringify({ paciente: "Paciente ficticio de prueba", fecha: "2026-09-20" }),
  });
  assert.equal(created.status, 201);
  const [cita] = await created.json();
  createdId = cita.id;
  assert.equal(cita.usuario_id, a.user.id);
  assert.equal(cita.estado, "pendiente");
  console.log("OK: POST crea una cita vinculada al usuario del JWT.");

  const axiosResult = await axios.get(`${url}/rest/v1/citas`, {
    params: { id: `eq.${createdId}`, select: "id,paciente,estado" },
    headers: { apikey: publicKey, Authorization: `Bearer ${a.access_token}` }, timeout: 15_000,
  });
  assert.equal(axiosResult.data[0].id, createdId);
  console.log("OK: Axios consulta la misma API REST que Fetch.");

  const other = await request(`citas?id=eq.${createdId}`, b.access_token);
  assert.deepEqual(await other.json(), []);
  const forbiddenUpdate = await request(`citas?id=eq.${createdId}`, b.access_token, {
    method: "PATCH", body: JSON.stringify({ estado: "cancelada" }),
  });
  assert.deepEqual(await forbiddenUpdate.json(), []);
  const impersonation = await request("citas", b.access_token, {
    method: "POST", body: JSON.stringify({ paciente: "No permitido", fecha: "2026-09-20", usuario_id: a.user.id }),
  });
  assert.equal(impersonation.status, 403);
  console.log("OK: RLS bloquea lectura, modificación y suplantación entre usuarios.");

  const patched = await request(`citas?id=eq.${createdId}`, a.access_token, {
    method: "PATCH", body: JSON.stringify({ estado: "confirmada" }),
  });
  assert(patched.ok);
  assert.equal((await patched.json())[0].estado, "confirmada");
  const pending = await request("citas?estado=eq.pendiente&select=id", a.access_token);
  assert.deepEqual(await pending.json(), []);
  console.log("OK: PATCH persiste el estado y GET filtra en el servidor.");

  const badRequest = await request("citas", a.access_token, {
    method: "POST", body: JSON.stringify({ paciente: "", fecha: "2026-09-20" }),
  });
  assert.equal(badRequest.status, 400);
  const invalidToken = await request("citas", "token-invalido");
  assert.equal(invalidToken.status, 401);
  const missing = await request("tabla_que_no_existe", a.access_token);
  assert.equal(missing.status, 404);
  await assert.rejects(axios.get(`${url}/rest/v1/tabla_que_no_existe`, {
    headers: { apikey: publicKey, Authorization: `Bearer ${a.access_token}` }, timeout: 15_000,
  }), (error) => axios.isAxiosError(error) && error.response?.status === 404);
  console.log("OK: validación 400, JWT inválido 401 y diferencia Fetch/Axios ante 404.");
} finally {
  if (createdId && sessions[0]) {
    const cleanup = await request(`citas?id=eq.${createdId}`, sessions[0].access_token, { method: "DELETE" });
    assert(cleanup.ok, "No se pudo limpiar la cita de prueba");
  }
  for (const client of clients) await client.auth.signOut({ scope: "local" });
}
console.log("Integración completada. Citas de prueba eliminadas; quedan dos usuarios anónimos de verificación en Auth.");
