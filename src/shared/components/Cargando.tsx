interface CargandoProps {
  mensaje?: string;
}

export default function Cargando({ mensaje = "Cargando..." }: CargandoProps) {
  return (
    <p
      role="status"
      className="animate-pulse text-sm text-slate-500 dark:text-slate-400"
    >
      {mensaje}
    </p>
  );
}
