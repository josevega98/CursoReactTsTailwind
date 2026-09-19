import type { ButtonHTMLAttributes } from "react";

type VarianteBoton = "primary" | "secondary" | "danger";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: VarianteBoton;
}

const ESTILOS_BASE = "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-wait disabled:opacity-50";
const ESTILOS_POR_VARIANTE: Record<VarianteBoton, string> = {
  primary: "bg-teal-700 text-white hover:bg-teal-800",
  secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
  danger: "bg-rose-700 text-white hover:bg-rose-800",
};

export default function Button({
  children,
  variante = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${ESTILOS_BASE} ${ESTILOS_POR_VARIANTE[variante]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
