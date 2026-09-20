import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import Button from "../../shared/components/Button";
import Cargando from "../../shared/components/Cargando";
import { supabase } from "../../shared/api/supabase";
import { queryClient } from "../../shared/api/queryClient";
import { mensajeError } from "../../shared/api/errores";
import { useSesionPractica } from "./useSesionPractica";
import ConsultaManual from "./ConsultaManual";
import ConsultaQuery from "./ConsultaQuery";

function Practica() {
  const { sesion, cargando } = useSesionPractica();
  const [modo, setModo] = useState<"manual" | "query">("manual");
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cambiarSesion() {
    if (!supabase || ocupado) return;
    setOcupado(true);
    setError(null);
    try {
      const resultado = sesion
        ? await supabase.auth.signOut({ scope: "local" })
        : await supabase.auth.signInAnonymously();
      if (resultado.error) throw resultado.error;
    } catch (causa) {
      setError(mensajeError(causa));
    } finally {
      setOcupado(false);
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Unidad 4 · Supabase</p>
          <h2 className="page-title">De la interfaz a una API real.</h2>
          <p className="muted text-sm">Consulta, registra y actualiza citas con una sesión de práctica.</p>
        </div>
        {supabase && !cargando && <Button variante="secondary" onClick={cambiarSesion} disabled={ocupado}>
          {ocupado ? "Conectando…" : sesion ? "Cerrar sesión de práctica" : "Entrar a la práctica"}
        </Button>}
      </div>

      {!supabase ? (
        <div className="panel" role="alert">Falta configurar Supabase. Copia .env.example a .env.local, completa la URL y la clave pública, y reinicia Vite.</div>
      ) : cargando ? <Cargando mensaje="Recuperando la sesión…" /> : (
        <>
          {error && <p role="alert" className="panel mb-5 text-rose-700 dark:text-rose-300">{error}</p>}
          {!sesion ? (
            <div className="panel">
              <h3 className="panel-title">Tu espacio para experimentar</h3>
              <p className="panel-note">Entra sin correo ni contraseña. Supabase creará un usuario de práctica con una sesión real. Solo podrás consultar y modificar tus propias citas.</p>
              <p className="panel-note">Usa datos ficticios. Si cierras la sesión o borras los datos del navegador, no podrás recuperar esta cuenta de práctica.</p>
            </div>
          ) : (
            <div key={sesion.user.id}>
              <div className="api-tabs" role="group" aria-label="Ejemplos de consumo de APIs">
                <Button variante={modo === "manual" ? "primary" : "secondary"} aria-pressed={modo === "manual"} onClick={() => setModo("manual")}>1 · Fetch y Axios</Button>
                <Button variante={modo === "query" ? "primary" : "secondary"} aria-pressed={modo === "query"} onClick={() => setModo("query")}>2 · TanStack Query</Button>
                <span className="muted text-xs">Sesión activa · {sesion.user.id.slice(0, 8)}</span>
              </div>
              {modo === "manual" ? <ConsultaManual /> : <ConsultaQuery usuarioId={sesion.user.id} />}
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default function ApiCitas() {
  return <QueryClientProvider client={queryClient}><Practica /></QueryClientProvider>;
}
