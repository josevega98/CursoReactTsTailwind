import type { FiltroEstado } from "./dominio";

interface FiltroProps {
  valor: FiltroEstado;
  onChange: (estado: FiltroEstado) => void;
}

export default function FiltroCitas({ valor, onChange }: FiltroProps) {
  return (
    <label className="field">
      Estado de las citas
      <select value={valor} onChange={(evento) => onChange(evento.target.value as FiltroEstado)}>
        <option value="todos">Todos los estados</option>
        <option value="pendiente">Pendientes</option>
        <option value="confirmada">Confirmadas</option>
        <option value="cancelada">Canceladas</option>
      </select>
    </label>
  );
}
