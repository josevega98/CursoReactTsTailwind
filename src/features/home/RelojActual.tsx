import { useAhora } from "./useAhora";

export default function RelojActual() {
  const ahora = useAhora();
  return (
    <div className="muted text-sm sm:text-right">
      <p className="capitalize">{ahora.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" })}</p>
      <p className="mt-1 text-xs">Hora local <time className="ml-2 font-semibold tabular-nums" dateTime={ahora.toISOString()}>{ahora.toLocaleTimeString("es-PE")}</time></p>
    </div>
  );
}
