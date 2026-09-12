import type { Cita } from "./dominio";

const citasDeEjemplo: Cita[] = [
  {
    id: 1,
    paciente: { id: 1, nombre: "Ana Torres", edad: 34 },
    fecha: "2026-09-20",
    estado: "pendiente",
  },
  {
    id: 2,
    paciente: { id: 2, nombre: "Carlos Ruiz", edad: 45 },
    fecha: "2026-09-18",
    estado: "confirmada",
  },
  {
    id: 3,
    paciente: { id: 3, nombre: "María Gómez", edad: 28 },
    fecha: "2026-09-15",
    estado: "cancelada",
  },
];

export default function Citas() {
  return (
    <section>
      <h2>Citas registradas</h2>
      <ul>
        {citasDeEjemplo.map((cita) => (
          <li key={cita.id}>
            {cita.paciente.nombre} — {cita.fecha} —{" "}
            <strong>{cita.estado}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
