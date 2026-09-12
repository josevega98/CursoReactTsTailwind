/**
 * DEMO 1 (TypeScript) — Sistema de Citas Médicas
 *
 * Ejecutar con: npm run demo:ts
 * Compara este archivo con demo/tipado.js (su gemelo en JavaScript puro).
 *
 * Objetivo: ver cómo TypeScript avisa errores EN EL EDITOR (VS Code),
 * antes de ejecutar nada, mientras que JavaScript los deja pasar.
 */

export {};

// ============================================================
// SECCIÓN 1: Tipado estricto de "propiedades", "eventos" y "estado"
// (analogías sin React, para entender el concepto antes de verlo en componentes)
// ============================================================

// Simulamos "propiedades" (props) de un componente con una interface:
interface PropsTarjetaPaciente {
  nombre: string;
  edad: number;
}

function renderTarjetaPaciente(props: PropsTarjetaPaciente): string {
  return `${props.nombre} (${props.edad} años)`;
}

// Simulamos un "event handler" tipado: una función con firma exacta,
// tal como se tipa un onClick/onChange en React.
type ManejadorClic = (idPaciente: number) => void;

const alHacerClicEnPaciente: ManejadorClic = (idPaciente) => {
  console.log(`Se hizo clic en el paciente con id ${idPaciente}`);
};

// Simulamos "estado" tipado: una variable + un setter con el mismo tipo,
// tal como useState<T> obliga a mantener siempre el mismo tipo de dato.
let contadorDeCitas: number = 0;

function actualizarContadorDeCitas(nuevoValor: number): void {
  contadorDeCitas = nuevoValor;
}

console.log(renderTarjetaPaciente({ nombre: "Ana Torres", edad: 34 }));
alHacerClicEnPaciente(101);
actualizarContadorDeCitas(5);
console.log("Contador de citas:", contadorDeCitas);

// actualizarContadorDeCitas("cinco"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

// renderTarjetaPaciente({ nombre: "Luis" }); // Error: Property 'edad' is missing

// ============================================================
// SECCIÓN 2: Interfaces, tipos de dominio, union types y type narrowing
// ============================================================

interface Paciente {
  id: number;
  nombre: string;
  edad: number;
}

// Union type: el estado de una cita SOLO puede ser uno de estos tres valores.
type EstadoCita = "pendiente" | "confirmada" | "cancelada";

interface Cita {
  id: number;
  paciente: Paciente;
  fecha: string; // formato ISO simple: "2026-09-20"
  estado: EstadoCita;
}

// Type narrowing: TypeScript "reduce" el tipo dentro de cada rama del switch,
// y si agregas un nuevo valor a EstadoCita sin actualizar este switch,
// el chequeo de "default" con "never" te avisará en tiempo de compilación.
function describirEstado(estado: EstadoCita): string {
  switch (estado) {
    case "pendiente":
      return "La cita está pendiente de confirmación.";
    case "confirmada":
      return "La cita fue confirmada por la clínica.";
    case "cancelada":
      return "La cita fue cancelada.";
    default: {
      const _exhaustivo: never = estado;
      return _exhaustivo;
    }
  }
}

const paciente: Paciente = { id: 1, nombre: "Ana Torres", edad: 34 };

const cita: Cita = {
  id: 1001,
  paciente,
  fecha: "2026-09-20",
  estado: "pendiente",
};

console.log(describirEstado(cita.estado));

// const citaInvalida: Cita = { id: 2, paciente, fecha: "2026-09-21", estado: "reagendada" };
// Error: Type '"reagendada"' is not assignable to type 'EstadoCita'.

// ============================================================
// SECCIÓN 3: "any" vs "unknown"
// ============================================================

function procesarEntradaConAny(entrada: any) {
  console.log("Nombre en mayúsculas:", entrada.nombre.toUpperCase());
}

// `unknown` es el tipo seguro: TypeScript te OBLIGA a comprobar (narrowing)
// la forma del dato antes de usarlo. Por eso no puedes acceder a
// "entrada.nombre" directamente.
function procesarEntradaConUnknown(entrada: unknown) {
  // entrada.nombre.toUpperCase(); // Error: 'entrada' is of type 'unknown'.

  if (typeof entrada === "object" && entrada !== null && "nombre" in entrada) {
    const posiblePaciente = entrada as { nombre: string };
    console.log("Nombre en mayúsculas:", posiblePaciente.nombre.toUpperCase());
  } else {
    console.log("La entrada no tiene la forma esperada de un paciente.");
  }
}

procesarEntradaConAny({ nombre: "Ana Torres" });
procesarEntradaConUnknown({ nombre: "Ana Torres" });

procesarEntradaConUnknown({ edad: 34 });

// procesarEntradaConAny({ edad: 34 }); // TypeError: Cannot read properties of undefined (reading 'toUpperCase')
