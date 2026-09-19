type VarianteBoton = "primary" | "secondary" | "danger";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  variante?: VarianteBoton;
}

// Fuera del componente: se crean una sola vez y no en cada render.
const ESTILOS_BASE = "text-white px-4 py-2 rounded-lg font-medium transition";

// Record<VarianteBoton, string> obliga a definir estilos para TODAS las
// variantes: si se agrega una nueva al tipo, TypeScript marca el error aquí.
const ESTILOS_POR_VARIANTE: Record<VarianteBoton, string> = {
  primary: "bg-blue-600 hover:bg-blue-700",
  secondary: "bg-gray-600 hover:bg-gray-700",
  danger: "bg-red-600 hover:bg-red-700",
};

export default function Button({
  children,
  onClick,
  variante = "primary",
}: ButtonProps) {
  return (
    <button
      className={`${ESTILOS_BASE} ${ESTILOS_POR_VARIANTE[variante]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
