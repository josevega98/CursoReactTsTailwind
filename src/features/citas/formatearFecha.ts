// Una fecha de agenda no representa un instante UTC: construimos la fecha local
// para evitar que en Perú se muestre el día anterior al interpretar YYYY-MM-DD.
export function formatearFecha(fecha: string): string {
  const [anio, mes, dia] = fecha.split("-").map(Number);
  return new Date(anio, mes - 1, dia).toLocaleDateString("es-PE", {
    day: "numeric", month: "long", year: "numeric",
  });
}
