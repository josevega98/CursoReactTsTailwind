import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

// Para implementar un boundary directamente en React usamos una clase:
// no existe un hook equivalente a getDerivedStateFromError.
// Atrapan errores lanzados al RENDERIZAR a sus hijos; no atrapan errores dentro
// de event handlers ni de código asíncrono (esos se manejan con try/catch).
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary atrapó un error:", error, info.componentStack);
  }

  reintentar = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900 dark:bg-rose-950/40"
        >
          <h2 className="text-base font-semibold text-rose-800 dark:text-rose-300">
            Algo salió mal en esta sección
          </h2>
          <p className="text-sm text-rose-700 dark:text-rose-400">
            {this.state.error.message}
          </p>
          <button
            onClick={this.reintentar}
            className="w-fit rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-300 active:scale-95"
          >
            Reintentar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
