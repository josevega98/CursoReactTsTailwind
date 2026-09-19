// API pública de la feature: lo único que el resto de la app puede importar.
// ProtectedRoute y session.ts viven en esta carpeta, pero desde fuera solo
// se accede a lo que se exporta aquí.
export { default as ProtectedRoute } from "./ProtectedRoute";
