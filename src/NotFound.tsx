export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-2 py-12 text-center">
      <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">
        404
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        La página que buscas no existe.
      </p>
    </section>
  );
}
