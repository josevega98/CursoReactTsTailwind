/**
 * DEMO 1 (JavaScript) — Sistema de Citas Médicas
 *
 * Ejecutar con: npm run demo:js

 */

export {};

// ============================================================
// SECCIÓN 1: "Propiedades", "eventos" y "estado" SIN tipos
// ============================================================

function renderTarjetaPaciente(props) {
  return `${props.nombre} (${props.edad} años)`;
}

const alHacerClicEnPaciente = (idPaciente) => {
  console.log(`Se hizo clic en el paciente con id ${idPaciente}`);
};

let contadorDeCitas = 0;

function actualizarContadorDeCitas(nuevoValor) {
  contadorDeCitas = nuevoValor;
}

console.log(renderTarjetaPaciente({ nombre: "Ana Torres", edad: 34 }));
alHacerClicEnPaciente(101);
actualizarContadorDeCitas(5);
console.log("Contador de citas:", contadorDeCitas);

// ⚠️ En TS esto es un error EN VIVO. Aquí en JS simplemente "funciona" mal:
// no truena, pero el contador ahora es un texto en vez de un número.
actualizarContadorDeCitas("cinco");
console.log("Contador de citas (después del bug silencioso):", contadorDeCitas);

// ⚠️ En TS esto también es un error EN VIVO (falta 'edad'). Aquí en JS
// no truena al llamarlo, pero el resultado sale con "undefined años".
console.log(renderTarjetaPaciente({ nombre: "Luis" }));

// ============================================================
// SECCIÓN 2: "Interfaces", tipos de dominio y estados SIN tipos
// ============================================================

// Sin interface: nada obliga a que un "paciente" tenga siempre
// id, nombre y edad. Aquí solo es una convención, no una regla.

function describirEstado(estado) {
  switch (estado) {
    case "pendiente":
      return "La cita está pendiente de confirmación.";
    case "confirmada":
      return "La cita fue confirmada por la clínica.";
    case "cancelada":
      return "La cita fue cancelada.";
    default:
      // En JS no hay forma de que el compilador te avise si te
      // olvidaste de un caso, o si alguien mandó un valor inválido.
      return `Estado desconocido: ${estado}`;
  }
}

const paciente = { id: 1, nombre: "Ana Torres", edad: 34 };

const cita = {
  id: 1001,
  paciente,
  fecha: "2026-09-20",
  estado: "pendiente",
};

console.log(describirEstado(cita.estado));

// ⚠️ En TS esto es un error EN VIVO ("reagendada" no es un EstadoCita válido).
// En JS este objeto se crea sin ninguna queja...
const citaInvalida = {
  id: 2,
  paciente,
  fecha: "2026-09-21",
  estado: "reagendada",
};

// ...y el bug solo se descubre aquí, en tiempo de ejecución, cuando cae en el "default":
console.log(describirEstado(citaInvalida.estado));

// ============================================================
// SECCIÓN 3: en JS, TODO se comporta como "any" (no existe "unknown")
// ============================================================

function procesarEntrada(entrada) {
  console.log("Nombre en mayúsculas:", entrada.nombre.toUpperCase());
}

procesarEntrada({ nombre: "Ana Torres" });

// procesarEntrada({ edad: 34 }); // TypeError: Cannot read properties of undefined (reading 'toUpperCase')
