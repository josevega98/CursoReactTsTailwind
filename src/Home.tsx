import RelojActual from "./RelojActual";

export default function Home() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
        Bienvenido
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Sistema de Citas Médicas — Unidad 1: bases de React + TypeScript.
      </p>
      <RelojActual />
    </section>
  );
}
