// FastNet — Hero (3 variants switchable via Tweaks)

const HeroEditorial = ({ go }) => (
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

const HeroProduct = ({ go }) => (
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

        <svg viewBox="0 0 460 440" className="w-[56%] h-auto relative z-[2]"
          style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.7))' }}>
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3A3F49"/>
              <stop offset="45%" stopColor="#22252C"/>
              <stop offset="100%" stopColor="#0E1014"/>
            </linearGradient>
            <linearGradient id="topGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A5058"/>
              <stop offset="100%" stopColor="#2A2E36"/>
            </linearGradient>
            <linearGradient id="sideGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1C1F25"/>
              <stop offset="100%" stopColor="#0A0B0D"/>
            </linearGradient>
            <linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.14)"/>
              <stop offset="15%" stopColor="rgba(255,255,255,0.04)"/>
              <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
            </linearGradient>
            <radialGradient id="ledGlow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="oklch(0.86 0.17 118)" stopOpacity="1"/>
              <stop offset="40%" stopColor="oklch(0.86 0.17 118)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="oklch(0.86 0.17 118)" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="ledGreen" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="oklch(0.76 0.16 155)" stopOpacity="1"/>
              <stop offset="40%" stopColor="oklch(0.76 0.16 155)" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="oklch(0.76 0.16 155)" stopOpacity="0"/>
            </radialGradient>
            <pattern id="micro" width="3" height="3" patternUnits="userSpaceOnUse">
              <rect width="3" height="3" fill="transparent"/>
              <circle cx="1.5" cy="1.5" r="0.35" fill="rgba(255,255,255,0.06)"/>
            </pattern>
          </defs>
          <ellipse cx="230" cy="420" rx="180" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)"/>
          <g>
            <rect x="120" y="28" width="4" height="60" rx="2" fill="#2A2E36"/>
            <rect x="336" y="28" width="4" height="60" rx="2" fill="#2A2E36"/>
            <circle cx="122" cy="26" r="6" fill="#14161A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <circle cx="338" cy="26" r="6" fill="#14161A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
            <circle cx="122" cy="26" r="2" fill="oklch(0.86 0.17 118)"/>
            <circle cx="338" cy="26" r="2" fill="oklch(0.86 0.17 118)"/>
          </g>
          <g>
            <path d="M 70 100 L 390 100 L 400 110 L 400 390 L 60 390 L 60 110 Z" fill="url(#sideGrad)"/>
            <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#bodyGrad)"/>
            <rect x="60" y="100" width="340" height="14" rx="8" fill="url(#topGrad)"/>
            <rect x="60" y="100" width="340" height="200" rx="18" fill="url(#sheen)"/>
            <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#micro)" opacity="0.6"/>
          </g>
          <g>
            <rect x="82" y="132" width="296" height="56" rx="6" fill="#050607" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
            <g opacity="0.95">
              <rect x="96"  y="158" width="3" height="20" fill="oklch(0.86 0.17 118)" opacity="0.9"/>
              <rect x="102" y="152" width="3" height="26" fill="oklch(0.86 0.17 118)" opacity="0.9"/>
              <rect x="108" y="160" width="3" height="18" fill="oklch(0.86 0.17 118)" opacity="0.7"/>
              <rect x="114" y="146" width="3" height="32" fill="oklch(0.86 0.17 118)"/>
              <rect x="120" y="155" width="3" height="23" fill="oklch(0.86 0.17 118)" opacity="0.8"/>
              <rect x="126" y="150" width="3" height="28" fill="oklch(0.86 0.17 118)" opacity="0.9"/>
              <rect x="132" y="162" width="3" height="16" fill="oklch(0.86 0.17 118)" opacity="0.6"/>
              <rect x="138" y="156" width="3" height="22" fill="oklch(0.86 0.17 118)" opacity="0.8"/>
            </g>
            <text x="162" y="160" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="oklch(0.86 0.17 118)">NR n77</text>
            <text x="162" y="172" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#8E939D">-68 dBm</text>
            <line x1="248" y1="140" x2="248" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
            <text x="262" y="152" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#8E939D">DOWN</text>
            <text x="262" y="164" fontFamily="ui-monospace,monospace" fontSize="10" fill="#F4F1EC" fontWeight="500">942</text>
            <text x="290" y="164" fontFamily="ui-monospace,monospace" fontSize="7" fill="#8E939D">Mbps</text>
            <text x="262" y="176" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5A606C">↑ 312 Mbps</text>
          </g>
          <g>
            <text x="82" y="216" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="2" fill="#5A606C">STATUS</text>
            <circle cx="88" cy="230" r="7" fill="url(#ledGlow)"/>
            <circle cx="88" cy="230" r="2.5" fill="oklch(0.86 0.17 118)"/>
            <circle cx="108" cy="230" r="7" fill="url(#ledGreen)"/>
            <circle cx="108" cy="230" r="2.5" fill="oklch(0.76 0.16 155)"/>
            <circle cx="128" cy="230" r="2.5" fill="#3A3F49"/>
            <circle cx="148" cy="230" r="2.5" fill="#3A3F49"/>
            <text x="170" y="233" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#8E939D">LINK · CARRIER A · B · C</text>
          </g>
          <g>
            <rect x="82" y="250" width="296" height="64" rx="4" fill="#050607" opacity="0.6"/>
            {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
              <line key={i} x1="88" y1={258 + i * 4} x2="372" y2={258 + i * 4} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            ))}
          </g>
          <g>
            <rect x="82" y="332" width="296" height="36" rx="4" fill="#050607" opacity="0.4"/>
            <text x="96" y="356" fontFamily="ui-monospace,monospace" fontSize="10" letterSpacing="3" fill="#F4F1EC" fontWeight="500">FASTNET</text>
            <line x1="166" y1="348" x2="166" y2="360" stroke="#3A3F49" strokeWidth="1"/>
            <text x="178" y="356" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="2" fill="#8E939D">BEACON · G2</text>
            <text x="300" y="356" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1" fill="#5A606C">BEA-2041-78</text>
          </g>
          <g opacity="0.25" transform="translate(0, 792) scale(1, -1)">
            <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#bodyGrad)"/>
          </g>
        </svg>

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

const Callout = ({ className, header, body, withDot }) => (
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

const HeroSignal = ({ go }) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    let w, h;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf;
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

Object.assign(window, { HeroEditorial, HeroProduct, HeroSignal });
