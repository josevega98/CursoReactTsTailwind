import type { ReactNode } from "react";
import { BotonTema } from "../features/tema";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

interface LayoutProps { children: ReactNode; }

// Composición: el layout recibe la página por children y el menú recibe acciones.
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header titulo="Clínica Salud Total" subtitulo="Sistema de citas médicas" />
      <Navbar
        enlaces={[
          { label: "Inicio", to: "/" },
          { label: "Citas", to: "/citas" },
          { label: "Administración", to: "/admin" },
        ]}
        acciones={<BotonTema />}
      />
      <main id="contenido" tabIndex={-1} className="page-width main-content">{children}</main>
      <Footer />
    </div>
  );
}
