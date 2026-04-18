// FastNet — Top navigation

const Nav = ({ current, go, theme }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const dark = theme === 'dark';

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleGo = (key) => { setMenuOpen(false); go(key); };

  const links = [
    { key: 'how', label: 'How it works' },
    { key: 'usecases', label: 'Use cases' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'availability', label: 'Check availability' },
  ];

  const headerBg = dark
    ? (scrolled ? 'bg-ink-900/70' : 'bg-ink-900/35')
    : (scrolled ? 'bg-bone-100/80' : 'bg-bone-100/40');
  const borderC = dark ? 'border-white/[0.06]' : 'border-black/[0.06]';

  return (
    <>
      <header className={cn(
        'sticky top-0 z-50 backdrop-blur-md backdrop-saturate-150 border-b transition-colors',
        headerBg, borderC
      )}>
        <div className="container-app flex items-center justify-between h-16">
          <button onClick={() => go('home')} className="flex">
            <Logo />
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <button key={l.key} onClick={() => go(l.key)}
                className={cn(
                  'text-sm font-medium tracking-tight transition-colors',
                  current === l.key
                    ? (dark ? 'text-bone-100' : 'text-ink-900')
                    : (dark ? 'text-ink-200 hover:text-bone-100' : 'text-ink-400 hover:text-ink-900')
                )}>
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button onClick={() => go('consultation')}
              className={cn('hidden md:inline text-sm font-medium', dark ? 'text-ink-200' : 'text-ink-500')}>
              Consult
            </button>
            <button onClick={() => go('pricing')} className={cn(
              'btn btn-sm',
              dark ? 'bg-bone-100 text-ink-900' : 'bg-ink-900 text-bone-100'
            )}>
              Get FastNet <Arrow size={12} />
            </button>
            <button onClick={() => setMenuOpen(true)} aria-label="Open menu"
              className={cn(
                'md:hidden w-10 h-10 rounded-lg inline-flex items-center justify-center',
                dark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'
              )}>
              <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
                <line x1="0" y1="2"  x2="18" y2="2"  stroke="currentColor" strokeWidth="1.6"/>
                <line x1="0" y1="7"  x2="18" y2="7"  stroke="currentColor" strokeWidth="1.6"/>
                <line x1="0" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.6"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-sheet" role="dialog" aria-modal="true">
          <button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <line x1="3" y1="3" x2="13" y2="13" stroke="currentColor" strokeWidth="1.6"/>
              <line x1="13" y1="3" x2="3" y2="13" stroke="currentColor" strokeWidth="1.6"/>
            </svg>
          </button>
          {links.map(l => (
            <button key={l.key} onClick={() => handleGo(l.key)}
              className={current === l.key ? 'text-signal' : 'text-bone-100'}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleGo('consultation')}>Consult</button>
          <button onClick={() => handleGo('pricing')}
            className="btn btn-lg btn-signal mt-6 justify-center">
            Get FastNet <Arrow size={14}/>
          </button>
        </div>
      )}
    </>
  );
};

window.Nav = Nav;
