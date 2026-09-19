import type { ReactNode } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
