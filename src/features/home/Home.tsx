import { Link } from "react-router-dom";
import { ResumenCitas, AgendaPendiente } from "../citas";
import ErrorBoundary from "../../shared/components/ErrorBoundary";
import BotonQueFalla from "./BotonQueFalla";
import RelojActual from "./RelojActual";

export default function Home() {
  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">Tu espacio de gestión</p><h2 className="page-title">Todo listo para cuidar.</h2><p className="muted text-sm">Una mirada clara a las citas de tu clínica.</p></div>
        <RelojActual />
      </div>
      <div className="hero">
        <div>
          <span className="eyebrow">Atención que conecta</span>
          <h2>Más cerca de tus pacientes.</h2>
          <p>Consulta tu agenda, revisa las citas pendientes y mantén cada atención en orden, desde un solo lugar.</p>
          <Link to="/citas" className="hero-link">Consultar citas <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="hero-aside">
          <span className="eyebrow">Clínica Salud Total</span>
          <strong>El cuidado empieza<br />con una buena organización.</strong>
          <p className="text-sm">Información sencilla y accesible para acompañar cada paso de la atención.</p>
        </div>
      </div>
      {/* Dos componentes llaman al mismo hook; cada uno posee su propio estado. */}
      <div className="dashboard-grid"><ResumenCitas /><AgendaPendiente /></div>
      <details className="demo-details">
        <summary>Laboratorio de la Unidad 3</summary>
        <div className="demo-content">
          <div>
            <h3 className="panel-title">Una lógica, distintas interfaces</h3>
            <p className="panel-note">Resumen y pendientes usan <code>useCitas()</code>. Pulsa Actualizar en uno: solo ese panel vuelve a cargar. La página Citas reutiliza el mismo hook para una tercera vista.</p>
            <p className="panel-note">El tema sí se comparte: cambia el modo desde el menú y observa cómo Context actualiza toda la aplicación.</p>
          </div>
          <div>
            <h3 className="panel-title mb-3">Un error contenido</h3>
            <p className="muted mb-4 text-sm">Provoca un error de render. Este panel se recupera con Reintentar y la agenda sigue disponible.</p>
            <ErrorBoundary><BotonQueFalla /></ErrorBoundary>
          </div>
        </div>
      </details>
    </section>
  );
}
