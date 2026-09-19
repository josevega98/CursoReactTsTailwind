// API pública de la feature: los tipos del dominio que otras features pueden usar.
// La página Citas no se exporta aquí: las páginas se importan por su ruta
// desde app/, porque más adelante se cargarán bajo demanda (lazy loading).
export type { Cita, EstadoCita, Paciente } from "./dominio";
