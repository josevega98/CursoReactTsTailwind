// API pública: otras features consumen estas piezas sin conocer el servicio.
// app/ importa las páginas por ruta para preservar sus puntos de entrada lazy.
export { useCitas } from "./useCitas";
export { default as ResumenCitas } from "./ResumenCitas";
export { default as AgendaPendiente } from "./AgendaPendiente";
export type { Cita, EstadoCita, Paciente } from "./dominio";
