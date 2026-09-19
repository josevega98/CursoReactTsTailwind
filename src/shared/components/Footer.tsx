interface FooterProps { anio?: number; }
export default function Footer({ anio = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="page-width footer-row">
        <p>© {anio} Clínica Salud Total</p>
        <p>Entorno de aprendizaje · React + TypeScript · Unidad 3</p>
      </div>
    </footer>
  );
}
