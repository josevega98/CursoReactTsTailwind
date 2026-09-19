import { Link } from "react-router-dom";
import Card from "../../shared/components/Card";

export default function Admin() {
  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Gestión de la clínica</p>
          <h2 className="page-title">Panel de administración</h2>
          <p className="muted text-sm">Un espacio reservado para la gestión de las atenciones.</p>
        </div>
      </div>
      <Card titulo="Acceso a la administración">
        <p className="muted text-sm">La sesión de demostración está habilitada. Desde aquí puedes acceder a la agenda de pacientes.</p>
        <Link to="/citas" className="text-link mt-5 inline-block">Consultar citas →</Link>
      </Card>
    </section>
  );
}
