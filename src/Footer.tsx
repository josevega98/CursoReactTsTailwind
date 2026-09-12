interface FooterProps {
  anio?: number;
}

export default function Footer({ anio = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="app-footer">
      <p>© {anio} Clínica Salud Total — Sistema de Citas Médicas</p>
    </footer>
  );
}
