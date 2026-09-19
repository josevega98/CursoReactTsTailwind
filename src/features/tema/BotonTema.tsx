import { useTema } from "./useTema";

export default function BotonTema() {
  const { tema, alternarTema } = useTema();

  return (
    <button
      onClick={alternarTema}
      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700
                 hover:bg-slate-100
                 focus:outline-none focus:ring-4 focus:ring-slate-300
                 active:scale-95
                 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-600"
    >
      {tema === "oscuro" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}
