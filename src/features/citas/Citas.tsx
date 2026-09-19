import Cargando from "../../shared/components/Cargando";
import CitaCard from "./CitaCard";
import { useCitas } from "./useCitas";

// La página solo decide QUÉ mostrar según el estado que entrega el hook.
export default function Citas() {
  const { citas, cargando, error } = useCitas();

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
        Citas registradas
      </h2>

      {cargando && <Cargando mensaje="Cargando citas..." />}

      {error && (
        <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">
          No se pudieron cargar las citas: {error}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {citas.map((cita) => (
          <CitaCard key={cita.id} cita={cita} />
        ))}
      </div>
    </section>
  );
}
