import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { listarConAxios } from "./citasAxios";
import { supabase } from "../../shared/api/supabase";
import { ErrorHttp } from "../../shared/api/errores";
import type { CitaApi, EstadoCitaApi, FiltroEstado, NuevaCita } from "./dominio";

// Las escrituras se enseñan en la sección de mutaciones de TanStack Query.
async function headersDeSesion() {
  const sesion = await supabase?.auth.getSession();
  if (sesion?.error) throw sesion.error;
  const token = sesion?.data.session?.access_token;
  if (!token) throw new Error("Inicia una sesión de práctica.");
  return {
    apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${token}`,
  };
}

async function crearCita(cita: NuevaCita) {
  await axios.post(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/citas`, cita, {
    headers: await headersDeSesion(),
  });
}

async function cambiarEstado(id: string, estado: EstadoCitaApi) {
  const { data } = await axios.patch<CitaApi[]>(`${import.meta.env.VITE_SUPABASE_URL}/rest/v1/citas`, { estado }, {
    params: { id: `eq.${id}` },
    headers: { ...await headersDeSesion(), Prefer: "return=representation" },
  });
  if (data.length === 0) throw new ErrorHttp(404);
}

export function useCitasQuery(usuarioId: string, estado: FiltroEstado) {
  return useQuery({
    // Usuario y filtro forman parte de la identidad de estos datos.
    queryKey: ["citas-api", usuarioId, estado],
    queryFn: ({ signal }) => listarConAxios(estado, signal),
  });
}

export function useCrearCita(usuarioId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: crearCita,
    // Esperar la invalidación mantiene isPending hasta terminar la actualización.
    onSuccess: () => client.invalidateQueries({ queryKey: ["citas-api", usuarioId] }),
  });
}

export function useCambiarEstado(usuarioId: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: EstadoCitaApi }) => cambiarEstado(id, estado),
    onSuccess: () => client.invalidateQueries({ queryKey: ["citas-api", usuarioId] }),
  });
}
