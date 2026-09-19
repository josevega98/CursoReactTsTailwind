import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../features/auth";
import Home from "../features/home/Home";
import Cargando from "../shared/components/Cargando";
import ErrorBoundary from "../shared/components/ErrorBoundary";
import NotFound from "./NotFound";

// Lazy loading: cada página se descarga como un archivo aparte, solo cuando
// el usuario entra por primera vez a su ruta. Home sigue siendo un import
// normal porque es lo primero que se ve.
const Citas = lazy(() => import("../features/citas/Citas"));
const Admin = lazy(() => import("../features/admin/Admin"));

export default function AppRoutes() {
  // useLocation solo funciona dentro de <BrowserRouter>; por eso las rutas
  // viven en este componente y no directamente en App.
  const { pathname } = useLocation();

  return (
    // key={pathname}: al navegar a otra ruta el boundary se reinicia, así un
    // error en una página no deja bloqueadas las demás. El fallback solo aparece
    // si el módulo sigue pendiente: lazy conserva los módulos ya resueltos.
    <ErrorBoundary key={pathname}>
      {/* Suspense muestra el fallback mientras se descarga el código de la página. */}
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
    </ErrorBoundary>
  );
}
