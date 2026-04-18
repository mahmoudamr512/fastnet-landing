// FastNet — shared primitives

const Logo = ({ dark = false, size = 20 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M12 4.5 C 7.3 4.5, 4.5 7.3, 4.5 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M12 19.5 C 16.7 19.5, 19.5 16.7, 19.5 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M12 1 C 5.4 1, 1 5.4, 1 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
      <path d="M12 23 C 18.6 23, 23 18.6, 23 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
    <span style={{
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 17,
      letterSpacing: '-0.02em'
    }}>
      FastNet
    </span>
  </div>
);

const Arrow = ({ size = 14, dir = 'right' }) => {
  const rot = { right: 0, up: -90, down: 90, left: 180 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
      <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// Signal strength bar icon
const SignalIcon = ({ strength = 4, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
    {[1,2,3,4].map(i => (
      <rect key={i} x={(i-1)*3.2 + 1} y={14 - i*3} width="2.2" height={i*3}
        fill="currentColor" opacity={i <= strength ? 1 : 0.2}/>
    ))}
  </svg>
);

// Section label with mono tag
const SectionTag = ({ number, children }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    marginBottom: 28,
  }}>
    <span className="mono-label" style={{ color: 'var(--signal-dim)' }}>{number}</span>
    <span style={{ width: 28, height: 1, background: 'currentColor', opacity: 0.25 }} />
    <span className="mono-label">{children}</span>
  </div>
);

// Scroll reveal wrapper
const Reveal = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => setInView(true), delay);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${inView ? 'in' : ''}`}>
      {children}
    </div>
  );
};

// Animated speed/throughput number
const Ticker = ({ to = 940, suffix = '', duration = 1400 }) => {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// Live status pill
const StatusPill = ({ state = 'active', label }) => {
  const colors = {
    active: 'var(--status-green)',
    standby: 'var(--status-amber)',
    down: 'var(--status-red)',
  };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px',
      borderRadius: 999,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%',
        background: colors[state],
        boxShadow: `0 0 8px ${colors[state]}`,
      }}/>
      {label}
    </div>
  );
};

Object.assign(window, { Logo, Arrow, SignalIcon, SectionTag, Reveal, Ticker, StatusPill });
