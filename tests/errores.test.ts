import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import test from "node:test";
import axios from "axios";
import { ErrorHttp, mensajeError } from "../src/shared/api/errores.ts";

test("distingue HTTP, timeout y ausencia de respuesta", async () => {
  const server = createServer((request, response) => {
    if (request.url === "/lento") return; // El cliente debe cortar por timeout.
    response.writeHead(403, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "denegado" }));
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert(address && typeof address !== "string");
  const url = `http://127.0.0.1:${address.port}`;

  try {
    const response = await fetch(url);
    assert.equal(response.ok, false);
    assert.equal(mensajeError(new ErrorHttp(response.status)), "No tienes permiso para realizar esta acción.");
    await assert.rejects(axios.get(url), (error) => mensajeError(error).includes("No tienes permiso"));
    await assert.rejects(axios.get(`${url}/lento`, { timeout: 30 }), (error) => mensajeError(error).includes("tardó demasiado"));
    await assert.rejects(fetch(`${url}/lento`, { signal: AbortSignal.timeout(30) }), (error) => mensajeError(error).includes("tardó demasiado"));
  } finally {
    server.closeAllConnections();
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
  await assert.rejects(fetch(url), (error) => mensajeError(error).includes("Revisa internet"));
  await assert.rejects(axios.get(url), (error) => mensajeError(error).includes("Revisa internet"));
});

test("mensajes para sesión inválida, recurso inexistente y servidor", () => {
  assert.match(mensajeError(new ErrorHttp(401)), /sesión no es válida/);
  assert.match(mensajeError(new ErrorHttp(404)), /no está disponible/);
  assert.match(mensajeError(new ErrorHttp(500)), /servidor/);
  assert.match(mensajeError(new ErrorHttp(400)), /HTTP 400/);
});
