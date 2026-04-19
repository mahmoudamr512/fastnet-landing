import React, { useEffect, useRef, useState } from 'react';

export const cn = (...args: Array<string | false | null | undefined>): string =>
  args.filter(Boolean).join(' ');

export const Logo = ({ size = 20 }: { size?: number }) => (
  <div className="flex items-center gap-2.5">
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      <path d="M12 4.5 C 7.3 4.5, 4.5 7.3, 4.5 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M12 19.5 C 16.7 19.5, 19.5 16.7, 19.5 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M12 1 C 5.4 1, 1 5.4, 1 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M12 23 C 18.6 23, 23 18.6, 23 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.35" />
    </svg>
    <span className="font-sans font-semibold text-[17px] tracking-tight">FastNet</span>
  </div>
);

type Direction = 'right' | 'up' | 'down' | 'left';
export const Arrow = ({ size = 14, dir = 'right' }: { size?: number; dir?: Direction }) => {
  const rot: Record<Direction, number> = { right: 0, up: -90, down: 90, left: 180 };
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ transform: `rotate(${rot[dir]}deg)` }} aria-hidden>
      <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const SignalIcon = ({ strength = 4, size = 14 }: { strength?: number; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden>
    {[1, 2, 3, 4].map((i) => (
      <rect key={i} x={(i - 1) * 3.2 + 1} y={14 - i * 3} width="2.2" height={i * 3} fill="currentColor" opacity={i <= strength ? 1 : 0.2} />
    ))}
  </svg>
);

export const SectionTag = ({ number, children }: { number: React.ReactNode; children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-7">
    <span className="mono-label text-[var(--color-signal-dim)]">{number}</span>
    <span className="w-7 h-px bg-current opacity-25" />
    <span className="mono-label">{children}</span>
  </div>
);

export const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setInView(true), delay);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={cn('reveal', inView && 'in')}>
      {children}
    </div>
  );
};

export const Ticker = ({ to = 940, suffix = '', duration = 1400 }: { to?: number; suffix?: string; duration?: number }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
};

type PillState = 'active' | 'standby' | 'down';
export const StatusPill = ({ state = 'active', label }: { state?: PillState; label: string }) => {
  const colorVar: Record<PillState, string> = {
    active: 'var(--color-status-green)',
    standby: 'var(--color-status-amber)',
    down: 'var(--color-status-red)',
  };
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] tracking-widest uppercase">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: colorVar[state], boxShadow: `0 0 8px ${colorVar[state]}` }} />
      {label}
    </div>
  );
};

type GoFn = (key: string) => void;
export const AuthorBadge = ({ go }: { go: GoFn }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-3 left-3 md:bottom-4 md:left-4 z-[150] font-mono text-[11px] tracking-wider uppercase">
      {open ? (
        <div className="bg-ink-900/95 text-bone-100 backdrop-blur-md rounded-2xl border border-white/[0.12] p-4 shadow-2xl flex flex-col gap-2 min-w-[220px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-signal">Built by</span>
            <button onClick={() => setOpen(false)} className="text-ink-300">close</button>
          </div>
          <div className="text-bone-100 text-[13px] normal-case tracking-tight font-sans font-medium">Mahmoud Amr</div>
          <button onClick={() => { setOpen(false); go('about'); }} className="text-left hover:text-signal transition-colors">
            About this project →
          </button>
          <a href="https://www.upwork.com/freelancers/mahmouda299" target="_blank" rel="noopener noreferrer" className="hover:text-signal transition-colors">Upwork →</a>
          <a href="https://www.linkedin.com/in/mahmoud-a-46818913b/" target="_blank" rel="noopener noreferrer" className="hover:text-signal transition-colors">LinkedIn →</a>
          <a href="https://github.com/mahmoudamr512/fastnet-landing" target="_blank" rel="noopener noreferrer" className="hover:text-signal transition-colors">GitHub source →</a>
        </div>
      ) : (
        <button onClick={() => setOpen(true)}
          className="author-badge px-3.5 py-1.5 bg-ink-900/85 text-bone-100 backdrop-blur-md rounded-full border border-white/[0.12] hover:bg-ink-900 transition-colors flex items-center gap-2 shadow-lg shadow-black/30">
          <span className="author-badge-dot w-2 h-2 rounded-full bg-signal" style={{ boxShadow: '0 0 10px var(--color-signal)' }} />
          Showcase · by Mahmoud Amr
        </button>
      )}
    </div>
  );
};

export type { GoFn };
