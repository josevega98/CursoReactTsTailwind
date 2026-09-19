import type { ReactNode } from "react";

interface CardProps { titulo?: string; acciones?: ReactNode; children: ReactNode; }

// Card conoce la estructura; cada feature decide el contenido de sus slots.
export default function Card({ titulo, acciones, children }: CardProps) {
  return (
    <article className="panel">
      {(titulo || acciones) && (
        <header className="panel-header">
          {titulo && <h3 className="panel-title">{titulo}</h3>}
          {acciones}
        </header>
      )}
      {children}
    </article>
  );
}
