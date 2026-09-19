import Card from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import Cargando from "../../shared/components/Cargando";
import { useCitas } from "./useCitas";

export default function ResumenCitas() {
  const { citas, cargando, error, recargar } = useCitas();
  const indicadores = [
    { etiqueta: "Registradas", valor: citas.length, detalle: "En la agenda" },
    {
      etiqueta: "Confirmadas",
      valor: citas.filter((cita) => cita.estado === "confirmada").length,
      detalle: "Atención confirmada",
    },
    {
      etiqueta: "Pendientes",
      valor: citas.filter((cita) => cita.estado === "pendiente").length,
      detalle: "Por confirmar",
    },
  ];

  return (
    <Card
      titulo="Resumen de citas"
      acciones={
        <Button variante="secondary" onClick={recargar} disabled={cargando} aria-label="Actualizar resumen">
          Actualizar
        </Button>
      }
    >
      {cargando ? (
        <Cargando mensaje="Actualizando resumen..." />
      ) : error ? (
        <p role="alert" className="text-rose-600 dark:text-rose-300">
          No se pudo cargar el resumen: {error}
        </p>
      ) : (
        <div className="stats-grid">
          {indicadores.map(({ etiqueta, valor, detalle }) => (
            <div className="stat" key={etiqueta}>
              <span>{etiqueta}</span>
              <strong>{valor.toString().padStart(2, "0")}</strong>
              <span>{detalle}</span>
            </div>
          ))}
        </div>
      )}
      <p className="panel-note">Un resumen de todas las citas registradas, incluidas las canceladas.</p>
    </Card>
  );
}
