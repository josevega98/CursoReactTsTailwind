import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="panel py-16 text-center">
      <p className="eyebrow">Error 404</p>
      <h2 className="page-title">Esta página no está disponible</h2>
      <p className="muted">Puedes volver al inicio o consultar la agenda desde el menú.</p>
      <Link className="hero-link" to="/">Volver al inicio →</Link>
    </section>
  );
}
