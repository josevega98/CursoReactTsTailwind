interface ButtonProps {
  children: string;
  onClick?: () => void;
  tipo_boton?: 'primary' | 'secondary' | 'danger';
}

export default function Button({ 
  children, 
  onClick, 
  tipo_boton = 'primary' 
}: ButtonProps) {
  const baseStyles = "text-white px-4 py-2 rounded-lg font-medium transition"; 
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700",
    danger: "bg-red-600 hover:bg-red-700",
  };

  return (
    <button 
      className={`${baseStyles} bg-blue-600 hover:bg-blue-700`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
