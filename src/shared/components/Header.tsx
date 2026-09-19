interface HeaderProps { titulo: string; subtitulo?: string; }

export default function Header({ titulo, subtitulo }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="page-width brand-row">
        <span className="brand-mark" aria-hidden="true">+</span>
        <div>
          <h1 className="brand-title">{titulo}</h1>
          {subtitulo && <p className="muted mt-1 text-xs">{subtitulo}</p>}
        </div>
        <span className="eyebrow ml-auto hidden sm:block">Cuidamos de ti</span>
      </div>
    </header>
  );
}
