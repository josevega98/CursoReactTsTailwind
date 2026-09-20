export type EstadoCitaApi = "pendiente" | "confirmada" | "cancelada";
export type FiltroEstado = "todos" | EstadoCitaApi;
export type Transporte = "fetch" | "axios";

export interface CitaApi {
  id: string;
  paciente: string;
  fecha: string;
  estado: EstadoCitaApi;
}

export interface NuevaCita {
  paciente: string;
  fecha: string;
}
