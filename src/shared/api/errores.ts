import axios from "axios";

export class ErrorHttp extends Error {
  status: number;

  constructor(status: number) {
    super(`La API respondió con HTTP ${status}.`);
    this.name = "ErrorHttp";
    this.status = status;
  }
}

export function mensajeError(error: unknown): string {
  const status = error instanceof ErrorHttp
    ? error.status
    : axios.isAxiosError(error) ? error.response?.status : undefined;

  if (status === 401) return "Tu sesión no es válida. Vuelve a entrar a la práctica.";
  if (status === 403) return "No tienes permiso para realizar esta acción.";
  if (status === 404) return "El recurso solicitado ya no está disponible.";
  if (status && status >= 500) return "El servidor no pudo responder. Intenta nuevamente.";
  if (status) return `La API rechazó la solicitud (HTTP ${status}). Revisa los datos enviados.`;

  if ((axios.isAxiosError(error) && error.code === "ECONNABORTED") ||
      (error instanceof DOMException && error.name === "TimeoutError")) {
    return "La solicitud tardó demasiado. Comprueba tu conexión y reintenta.";
  }
  if ((axios.isAxiosError(error) && !error.response) || error instanceof TypeError) {
    return "No pudimos conectar con la API. Revisa internet y vuelve a intentar.";
  }
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}
