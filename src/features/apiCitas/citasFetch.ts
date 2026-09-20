import { supabase } from "../../shared/api/supabase";
import { ErrorHttp } from "../../shared/api/errores";
import type { CitaApi, FiltroEstado } from "./dominio";

export async function listarConFetch(estado: FiltroEstado, signal?: AbortSignal): Promise<CitaApi[]> {
  const sesion = await supabase?.auth.getSession();
  if (sesion?.error) throw sesion.error;
  const token = sesion?.data.session?.access_token;
  if (!token) throw new Error("Inicia una sesión de práctica.");

  const filtro = estado === "todos" ? "" : `&estado=eq.${estado}`;
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/citas?select=id,paciente,fecha,estado${filtro}`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    signal,
  });
  if (!response.ok) throw new ErrorHttp(response.status);
  return response.json();
}
