import Card from "../../shared/components/Card";

export default function Admin() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold leading-6 text-slate-900 dark:text-white">
        Panel de administración
      </h2>
      <Card titulo="Ruta protegida">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Esta página solo es visible si{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            isAuthenticated
          </code>{" "}
          es{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            true
          </code>{" "}
          en{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            src/features/auth/session.ts
          </code>
          .
        </p>
      </Card>
    </section>
  );
}
