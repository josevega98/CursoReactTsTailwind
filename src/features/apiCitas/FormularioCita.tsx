import { useState, type SubmitEvent } from "react";
import Button from "../../shared/components/Button";
import Card from "../../shared/components/Card";
import { mensajeError } from "../../shared/api/errores";
import { useCrearCita } from "./useCitasQuery";

export default function FormularioCita({ usuarioId }: { usuarioId: string }) {
  const [paciente, setPaciente] = useState("");
  const [fecha, setFecha] = useState("");
  const crear = useCrearCita(usuarioId);

  function enviar(evento: SubmitEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!paciente.trim() || !fecha || crear.isPending) return;
    crear.mutate({ paciente: paciente.trim(), fecha }, {
      onSuccess: () => { setPaciente(""); setFecha(""); },
    });
  }

  return (
    <Card titulo="Registrar una cita">
      <form onSubmit={enviar} className="flex flex-col gap-4">
        <label className="field">
          Nombre del paciente
          <input value={paciente} onChange={(evento) => { setPaciente(evento.target.value); crear.reset(); }}
            placeholder="Ej. Ana Torres" required maxLength={80} disabled={crear.isPending} />
        </label>
        <label className="field">
          Fecha
          <input type="date" value={fecha} onChange={(evento) => { setFecha(evento.target.value); crear.reset(); }}
            required disabled={crear.isPending} />
        </label>
        <Button type="submit" disabled={crear.isPending || !paciente.trim() || !fecha}>
          {crear.isPending ? "Guardando y actualizando…" : "Guardar cita"}
        </Button>
        {crear.isError && <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">{mensajeError(crear.error)}</p>}
        {crear.isSuccess && <p role="status" className="text-sm text-teal-700 dark:text-teal-300">Cita creada como pendiente.</p>}
      </form>
    </Card>
  );
}
