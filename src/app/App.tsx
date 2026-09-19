import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { ProtectedRoute } from "../features/auth";
import { TemaProvider } from "../features/tema";
import Home from "../features/home/Home";
import Cargando from "../shared/components/Cargando";
import NotFound from "./NotFound";

// Lazy loading: cada página se descarga como un archivo aparte, solo cuando
// el usuario entra por primera vez a su ruta. Home sigue siendo un import
// normal porque es lo primero que se ve.
const Citas = lazy(() => import("../features/citas/Citas"));
const Admin = lazy(() => import("../features/admin/Admin"));

// Todo lo que está dentro de <TemaProvider> puede usar useTema().
export default function App() {
  return (
    <TemaProvider>
      <BrowserRouter>
        <Layout>
          {/* Suspense muestra el fallback mientras se descarga el código de la página.
              Ojo: al navegar con un enlace, React Router usa una transición y React
              mantiene visible la página anterior hasta que la nueva esté lista; el
              fallback se ve al entrar directo a la URL (por ejemplo, recargando en /citas). */}
          <Suspense fallback={<Cargando mensaje="Cargando página..." />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/citas" element={<Citas />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </TemaProvider>
  );
}
