export interface Paciente {
  id: number;
  nombre: string;
  edad: number;
}

export type EstadoCita = "pendiente" | "confirmada" | "cancelada";

export interface Cita {
  id: number;
  paciente: Paciente;
  fecha: string;
  estado: EstadoCita;
}
