import type { ReactNode } from "react";

interface CardProps {
  titulo?: string;
  acciones?: ReactNode;
  children: ReactNode;
}

// Composición: Card no sabe qué contiene. Recibe el contenido por "children"
// y un espacio opcional ("slot") para acciones; cada feature decide qué poner.
export default function Card({ titulo, acciones, children }: CardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 shadow-sm ring-1 ring-slate-900/5 dark:border-slate-700 dark:ring-white/10">
      {(titulo || acciones) && (
        <header className="flex flex-wrap items-start justify-between gap-2">
          {titulo && (
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              {titulo}
            </h3>
          )}
          {acciones}
        </header>
      )}
      {children}
    </article>
  );
}
