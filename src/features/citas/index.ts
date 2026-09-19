// API pública de la feature: lo que otras features pueden usar.
// La página Citas no se exporta aquí: las páginas se importan por su ruta
// desde app/, porque más adelante se cargarán bajo demanda (lazy loading).
export { useCitas } from "./useCitas";
export type { Cita, EstadoCita, Paciente } from "./dominio";
