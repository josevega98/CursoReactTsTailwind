interface HeaderProps {
  titulo: string;
  subtitulo?: string;
}

export default function Header({ titulo, subtitulo }: HeaderProps) {
  return (
    <header className="border-b border-red-500 px-6 py-4 dark:border-red-800">
      <h1 className="text-2xl font-semibold font-stardos-stencil-regular text-slate-900 dark:text-red-500 lg:text-center">
        {titulo}
      </h1>
      {subtitulo && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {subtitulo}
        </p>
      )}
    </header>
  );
}
