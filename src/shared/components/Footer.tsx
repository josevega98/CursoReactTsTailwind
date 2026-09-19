interface FooterProps {
  anio?: number;
}

export default function Footer({ anio = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        © {anio} Clínica Salud Total — Sistema de Citas Médicas
      </p>
    </footer>
  );
}
