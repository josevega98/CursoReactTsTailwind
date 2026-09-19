import type { Cita } from "./dominio";

const citas: Cita[] = [
  {
    id: 1,
    paciente: { id: 1, nombre: "Ana Torres", edad: 34 },
    fecha: "2026-09-20",
    estado: "pendiente",
  },
  {
    id: 2,
    paciente: { id: 2, nombre: "Carlos Ruiz", edad: 45 },
    fecha: "2026-09-18",
    estado: "confirmada",
  },
  {
    id: 3,
    paciente: { id: 3, nombre: "María Gómez", edad: 28 },
    fecha: "2026-09-15",
    estado: "cancelada",
  },
];

const LATENCIA_SIMULADA_MS = 800;

const esperar = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// Capa de servicios: el único lugar que sabe de dónde vienen los datos.
// Hoy simula una API con espera; cuando exista un backend, solo cambia el
// interior de esta función (por ejemplo, un fetch) y nada más en la app.
export async function listarCitas(): Promise<Cita[]> {
  await esperar(LATENCIA_SIMULADA_MS);
  return [...citas];
}
