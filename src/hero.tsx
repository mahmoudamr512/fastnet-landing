import React from 'react';
import { Arrow, Ticker, cn, type GoFn } from './primitives';
import { BeaconG2 } from './svg/BeaconG2';

interface HeroProps { go: GoFn }

export const HeroEditorial = ({ go }: HeroProps) => (
  <section className="relative overflow-hidden py-14 md:py-20 md:pb-32 bg-ink-900 text-bone-100">
    <div className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
      }}/>
    <div className="container-app relative">
      <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-3 mb-12 md:mb-[72px]">
        <div className="flex items-center gap-2.5">
          <span className="signal-dot" />
          <span className="mono-label text-signal">Live network · US-West</span>
        </div>
        <span className="mono-label">FN-01 / Introducing</span>
      </div>

      <h1 className="display-1 m-0 max-w-[14ch]">
        The internet,{' '}
        <span className="italic text-signal">always on.</span>
      </h1>

      <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-16 mt-12 md:mt-20 md:items-end">
        <p className="body-lg max-w-[46ch] text-ink-200 m-0">
          Private 5G — engineered as a primary connection where fiber can't reach,
          and as a silent failover when it fails. Installed by specialists. Monitored around the clock.
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:justify-end">
          <button className="btn btn-lg btn-signal" onClick={() => go('pricing')}>
            View plans <Arrow size={14} />
          </button>
          <button className="btn btn-lg btn-ghost" onClick={() => go('availability')}>
            Check availability
          </button>
        </div>
      </div>

      <div className="mt-16 md:mt-30 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-[14px] overflow-hidden">
        {[
          { l: 'Median downlink', v: <><Ticker to={940} />{' '}Mbps</> },
          { l: 'Failover switch', v: <>&lt; <Ticker to={400} duration={1000}/>{' '}ms</> },
          { l: 'Uptime SLA',      v: <>99.<Ticker to={99} duration={900}/>%</> },
          { l: 'Monitored',       v: '24 / 7 / 365' },
        ].map((m, i) => (
          <div key={i} className="bg-ink-900 px-4 py-5 md:px-6 md:py-7">
            <div className="mono-label">{m.l}</div>
            <div className="font-display text-[28px] md:text-[44px] leading-none mt-3.5 tracking-tight">
              {m.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const HeroProduct = ({ go }: HeroProps) => (
  <section className="relative overflow-hidden py-14 md:py-20 bg-ink-900 text-bone-100">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] w-[900px] h-[900px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 60%)' }}/>

    <div className="container-app relative">
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-8 md:mb-12">
        <div className="flex items-center gap-2.5">
          <span className="signal-dot" />
          <span className="mono-label text-signal">FastNet Beacon · Gen 2</span>
        </div>
        <span className="mono-label">Custom hardware</span>
      </div>

      <div className="text-center">
        <h1 className="display-1 m-0">
          Engineered for<br/>
          <span className="italic text-signal">homes that run on signal.</span>
        </h1>
        <p className="body-lg max-w-[52ch] mx-auto mt-8 text-ink-200">
          A discreet mmWave gateway. Installed in a utility closet.
          Delivers primary 5G where fiber can't — and catches you in under a second when it falls.
        </p>
      </div>

      <div className="relative mt-12 md:mt-20 aspect-[16/9] rounded-[22px] border border-white/[0.08] flex items-center justify-center overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1C1F25 0%, #0A0B0D 70%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 55%)' }}/>
        <div className="absolute bottom-0 inset-x-0 h-[35%] pointer-events-none bg-gradient-to-t from-white/[0.03] to-transparent"/>

        <svg viewBox="0 0 800 450" preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
          {[0.6, 0.7, 0.8, 0.9, 1.0].map((y, i) => (
            <line key={i} x1="0" y1={y * 450} x2="800" y2={y * 450}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          ))}
        </svg>

        <BeaconG2 />

        <Callout className="hidden md:flex top-[16%] right-[8%]" colorVar="signal" header="RADIOS" body="5G mmWave · Sub-6" withDot/>
        <Callout className="hidden md:block top-[14%] left-[6%]" colorVar="signal" header="PEAK" body="3.4 Gbps"/>
        <Callout className="hidden md:block bottom-[20%] left-[6%]" colorVar="signal" header="SIM" body="Dual · Carrier diverse"/>
        <Callout className="hidden md:block bottom-[18%] right-[8%]" colorVar="signal" header="I/O" body="2.5GbE · SFP+"/>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[2] hidden md:block">
          <line x1="20%" y1="22%" x2="34%" y2="34%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1="80%" y1="22%" x2="66%" y2="34%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1="20%" y1="74%" x2="34%" y2="62%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
          <line x1="80%" y1="76%" x2="66%" y2="62%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
        </svg>
      </div>

      <div className="flex flex-col md:flex-row gap-3 justify-center mt-10 md:mt-12">
        <button className="btn btn-lg btn-signal" onClick={() => go('pricing')}>
          Configure & buy <Arrow size={14}/>
        </button>
        <button className="btn btn-lg btn-ghost" onClick={() => go('how')}>
          See how it works
        </button>
      </div>
    </div>
  </section>
);

interface CalloutProps {
  className?: string;
  colorVar?: string;
  header: string;
  body: string;
  withDot?: boolean;
}
const Callout = ({ className, header, body, withDot }: CalloutProps) => (
  <div className={cn(
    'absolute px-3.5 py-2.5 rounded-[10px] border border-white/10 bg-ink-900/75 backdrop-blur-md',
    'font-mono text-[11px] tracking-wider z-[3] items-center gap-2.5',
    withDot ? 'flex' : 'block',
    className
  )}>
    {withDot && <span className="signal-dot w-1.5 h-1.5"/>}
    <div>
      <div className="text-signal text-[9px] tracking-widest">{header}</div>
      <div className="text-bone-100">{body}</div>
    </div>
  </div>
);

export const HeroSignal = ({ go }: HeroProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.5;
      const cy = h * 0.6;
      for (let i = 0; i < 8; i++) {
        const phase = (t + i * 0.18) % 1;
        const r = phase * Math.max(w, h) * 0.7;
        const alpha = (1 - phase) * 0.35;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(205, 235, 90, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgb(205, 235, 90)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(205, 235, 90, 0.18)';
      ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <section className="pt-14 md:pt-20 bg-ink-900 text-bone-100 relative overflow-hidden">
      <div className="container-app relative z-[2]">
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-10 md:mb-15">
          <div className="flex items-center gap-2.5">
            <span className="signal-dot" />
            <span className="mono-label text-signal">Signal integrity · 99.97%</span>
          </div>
          <span className="mono-label">Primary · Failover · Always</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 md:items-center">
          <div>
            <h1 className="display-2 m-0">
              Signal is <span className="italic text-signal">infrastructure</span>.<br/>We treat it that way.
            </h1>
            <p className="body-lg max-w-[40ch] text-ink-200 mt-7">
              FastNet is a managed 5G service for the places a modem and a hope won't do.
              Custom hardware, carrier-diverse routing, hands-on installation by our network team.
            </p>
            <div className="flex flex-col md:flex-row gap-3 mt-10">
              <button className="btn btn-lg btn-signal" onClick={() => go('pricing')}>
                Plans & pricing <Arrow size={14}/>
              </button>
              <button className="btn btn-lg btn-ghost" onClick={() => go('consultation')}>
                Schedule a consultation
              </button>
            </div>
          </div>

          <div className="relative aspect-square rounded-[22px] border border-white/[0.08] overflow-hidden"
            style={{ background: 'radial-gradient(circle at 50% 60%, rgba(205,235,90,0.08), transparent 60%)' }}>
            <canvas ref={canvasRef} className="w-full h-full block"/>
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="mono-sm text-ink-300">LAT 34.0194°N</span>
              <span className="mono-sm text-ink-300">LNG 118.4912°W</span>
            </div>
            <div className="absolute top-4 right-4 text-right">
              <div className="mono-label text-signal">Tx/Rx</div>
              <div className="mono-sm text-ink-200">n41 · n77 · n258</div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="mono-label">Uplink</div>
              <div className="mono-sm text-ink-100">312 Mbps</div>
            </div>
            <div className="absolute bottom-4 right-4 text-right">
              <div className="mono-label">Downlink</div>
              <div className="mono-sm text-ink-100">940 Mbps</div>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-25 py-8 border-t border-white/[0.08] flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
          <span className="mono-label">Trusted by integrators serving</span>
          <div className="flex flex-wrap gap-4 md:gap-12 items-center text-ink-300">
            {['CRESTRON CERTIFIED','SAVANT PARTNER','LUTRON RA3','CONTROL4','SMART HOME'].map(b => (
              <span key={b} className="font-mono text-[11px] tracking-widest">{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

