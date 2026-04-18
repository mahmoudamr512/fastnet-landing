// FastNet — Top navigation

const Nav = ({ current, go, theme }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
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
    { key: 'how',       label: 'How it works' },
    { key: 'usecases',  label: 'Use cases' },
    { key: 'pricing',   label: 'Pricing' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'availability', label: 'Check availability' },
  ];

  const darkBg = theme === 'dark';

  return (
    <>
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'saturate(1.6) blur(14px)',
      WebkitBackdropFilter: 'saturate(1.6) blur(14px)',
      background: darkBg
        ? (scrolled ? 'rgba(10,11,13,0.72)' : 'rgba(10,11,13,0.35)')
        : (scrolled ? 'rgba(244,241,236,0.78)' : 'rgba(244,241,236,0.4)'),
      borderBottom: `1px solid ${darkBg ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      transition: 'background .2s ease',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64,
      }}>
        <button onClick={() => go('home')} style={{ display: 'flex' }}>
          <Logo />
        </button>

        <nav data-desktop-nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <button key={l.key} onClick={() => go(l.key)}
              style={{
                fontSize: 14,
                fontWeight: 450,
                letterSpacing: '-0.005em',
                color: current === l.key
                  ? (darkBg ? 'var(--bone-100)' : 'var(--ink-900)')
                  : (darkBg ? 'var(--ink-200)' : 'var(--ink-400)'),
                transition: 'color .15s',
              }}>
              {l.label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button data-consult-link onClick={() => go('consultation')}
            style={{ fontSize: 14, fontWeight: 450, color: darkBg ? 'var(--ink-200)' : 'var(--ink-500)' }}>
            Consult
          </button>
          <button onClick={() => go('pricing')} className="btn btn-sm"
            style={{
              background: darkBg ? 'var(--bone-100)' : 'var(--ink-900)',
              color: darkBg ? 'var(--ink-900)' : 'var(--bone-100)',
            }}>
            Get FastNet <Arrow size={12} />
          </button>
          <button data-mobile-burger onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              width: 40, height: 40, borderRadius: 10,
              alignItems: 'center', justifyContent: 'center',
              background: darkBg ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            }}>
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
              style={{ color: current === l.key ? 'var(--signal)' : 'var(--bone-100)' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => handleGo('consultation')}>Consult</button>
          <button onClick={() => handleGo('pricing')}
            className="btn btn-lg btn-signal"
            style={{ marginTop: 24, justifyContent: 'center' }}>
            Get FastNet <Arrow size={14}/>
          </button>
        </div>
      )}
    </>
  );
};

window.Nav = Nav;
