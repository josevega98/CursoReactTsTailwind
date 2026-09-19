import type { ReactNode } from "react";
import { BotonTema } from "../features/tema";
import Header from "../shared/components/Header";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

interface LayoutProps {
  children: ReactNode;
}

// Componente "general": compone Header + Navbar + Footer alrededor
// del contenido de cada página (children). Esto es composición de componentes.
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900 dark:bg-slate-900 dark:text-white">
      <Header
        titulo="Sistema de Citas Médicas"
        subtitulo="Clínica Salud Total"
      />
      <Navbar
        enlaces={[
          { label: "Inicio", to: "/" },
          { label: "Citas", to: "/citas" },
          { label: "Administración", to: "/admin" },
        ]}
      />
      <div className="flex justify-end px-6">
        <BotonTema />
      </div>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
