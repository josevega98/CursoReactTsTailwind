import { useCitas } from "../citas";
import BotonQueFalla from "./BotonQueFalla";
import RelojActual from "./RelojActual";

export default function Home() {
  // Reutiliza el MISMO hook que la página de citas: se comparte la lógica,
  // no el estado (cada componente que llama a useCitas tiene su propia copia).
  const { citas, cargando } = useCitas();
  const pendientes = citas.filter((cita) => cita.estado === "pendiente").length;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
        Bienvenido
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Sistema de Citas Médicas — Unidad 1: bases de React + TypeScript.
      </p>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Citas pendientes:{" "}
        <strong className="font-semibold text-slate-900 dark:text-white">
          {cargando ? "..." : pendientes}
        </strong>
      </p>
      <RelojActual />
      <BotonQueFalla />
    </section>
  );
}
