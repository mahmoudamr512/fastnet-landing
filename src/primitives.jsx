// FastNet — shared primitives

const cn = (...args) => args.filter(Boolean).join(' ');

const Logo = ({ size = 20 }) => (
  <div className="flex items-center gap-2.5">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M12 4.5 C 7.3 4.5, 4.5 7.3, 4.5 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M12 19.5 C 16.7 19.5, 19.5 16.7, 19.5 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M12 1 C 5.4 1, 1 5.4, 1 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
      <path d="M12 23 C 18.6 23, 23 18.6, 23 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35"/>
    </svg>
    <span className="font-sans font-semibold text-[17px] tracking-tight">FastNet</span>
  </div>
);

const Arrow = ({ size = 14, dir = 'right' }) => {
  const rot = { right: 0, up: -90, down: 90, left: 180 }[dir] || 0;
  return (
    <svg width={size} height={size} viewBox="0 0 14 14"
      style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
      <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const SignalIcon = ({ strength = 4, size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
    {[1,2,3,4].map(i => (
      <rect key={i} x={(i-1)*3.2 + 1} y={14 - i*3} width="2.2" height={i*3}
        fill="currentColor" opacity={i <= strength ? 1 : 0.2}/>
    ))}
  </svg>
);

const SectionTag = ({ number, children }) => (
  <div className="flex items-center gap-3 mb-7">
    <span className="mono-label text-[var(--color-signal-dim)]">{number}</span>
    <span className="w-7 h-px bg-current opacity-25" />
    <span className="mono-label">{children}</span>
  </div>
);

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
    <div ref={ref} className={cn('reveal', inView && 'in')}>
      {children}
    </div>
  );
};

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

const StatusPill = ({ state = 'active', label }) => {
  const colorVar = {
    active: 'var(--color-status-green)',
    standby: 'var(--color-status-amber)',
    down: 'var(--color-status-red)',
  }[state];
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] tracking-widest uppercase">
      <span className="w-1.5 h-1.5 rounded-full"
        style={{ background: colorVar, boxShadow: `0 0 8px ${colorVar}` }}/>
      {label}
    </div>
  );
};

Object.assign(window, { cn, Logo, Arrow, SignalIcon, SectionTag, Reveal, Ticker, StatusPill });
