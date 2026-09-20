import axios from "axios";
import { supabase } from "../../shared/api/supabase";
import type { CitaApi, FiltroEstado } from "./dominio";

export async function listarConAxios(estado: FiltroEstado, signal?: AbortSignal): Promise<CitaApi[]> {
  const sesion = await supabase?.auth.getSession();
  if (sesion?.error) throw sesion.error;
  const token = sesion?.data.session?.access_token;
  if (!token) throw new Error("Inicia una sesión de práctica.");

  const { data } = await axios.get(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/citas`, {
    headers: {
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${token}`,
    },
    params: { select: "id,paciente,fecha,estado", estado: estado === "todos" ? undefined : `eq.${estado}` },
    signal,
  });
  return data;
}
