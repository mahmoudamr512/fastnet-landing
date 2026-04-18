// FastNet — Top navigation

const Nav = ({ current, go, theme }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { key: 'how',       label: 'How it works' },
    { key: 'usecases',  label: 'Use cases' },
    { key: 'pricing',   label: 'Pricing' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'availability', label: 'Check availability' },
  ];

  const darkBg = theme === 'dark';

  return (
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

        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
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
          <button onClick={() => go('consultation')}
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
        </div>
      </div>
    </header>
  );
};

window.Nav = Nav;
