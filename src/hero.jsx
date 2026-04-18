// FastNet — Hero (3 variants switchable via Tweaks)

// ——— Variant A: Editorial / typographic statement ———
const HeroEditorial = ({ go }) => {
  return (
    <section style={{
      padding: '80px 0 120px',
      background: 'var(--ink-900)',
      color: 'var(--bone-100)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)',
      }}/>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 72,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="signal-dot" />
            <span className="mono-label" style={{ color: 'var(--signal)' }}>Live network · US-West</span>
          </div>
          <span className="mono-label">FN-01 / Introducing</span>
        </div>

        <h1 className="display-1" style={{ margin: 0, maxWidth: '14ch' }}>
          The internet,{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--signal)' }}>
            always on.
          </span>
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 64,
          marginTop: 80,
          alignItems: 'end',
        }}>
          <p className="body-lg" style={{ maxWidth: '46ch', color: 'var(--ink-200)', margin: 0 }}>
            Private 5G — engineered as a primary connection where fiber can't reach,
            and as a silent failover when it fails. Installed by specialists. Monitored around the clock.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <button className="btn btn-lg btn-signal" onClick={() => go('pricing')}>
              View plans <Arrow size={14} />
            </button>
            <button className="btn btn-lg btn-ghost" onClick={() => go('availability')}>
              Check availability
            </button>
          </div>
        </div>

        {/* Metrics rail */}
        <div style={{
          marginTop: 120,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14,
          overflow: 'hidden',
        }}>
          {[
            { l: 'Median downlink', v: <><Ticker to={940} />{' '}Mbps</> },
            { l: 'Failover switch', v: <>&lt; <Ticker to={400} duration={1000}/>{' '}ms</> },
            { l: 'Uptime SLA',      v: <>99.<Ticker to={99} duration={900}/>%</> },
            { l: 'Monitored',       v: '24 / 7 / 365' },
          ].map((m, i) => (
            <div key={i} style={{
              padding: '28px 24px',
              background: 'var(--ink-900)',
            }}>
              <div className="mono-label">{m.l}</div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1,
                marginTop: 14, letterSpacing: '-0.02em'
              }}>
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ——— Variant B: Product / hardware ———
const HeroProduct = ({ go }) => {
  return (
    <section style={{
      padding: '80px 0',
      background: 'var(--ink-900)',
      color: 'var(--bone-100)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Radial signal glow behind product */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -30%)',
        width: 900, height: 900,
        background: 'radial-gradient(circle, var(--signal-soft) 0%, transparent 60%)',
        pointerEvents: 'none',
      }}/>

      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="signal-dot" />
            <span className="mono-label" style={{ color: 'var(--signal)' }}>FastNet Beacon · Gen 2</span>
          </div>
          <span className="mono-label">Custom hardware</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h1 className="display-1" style={{ margin: 0 }}>
            Engineered for<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--signal)' }}>homes that run on signal.</span>
          </h1>
          <p className="body-lg" style={{
            maxWidth: '52ch', margin: '32px auto 0', color: 'var(--ink-200)',
          }}>
            A discreet mmWave gateway. Installed in a utility closet.
            Delivers primary 5G where fiber can't — and catches you in under a second when it falls.
          </p>
        </div>

        {/* Product render */}
        <div style={{
          marginTop: 80,
          position: 'relative',
          aspectRatio: '16 / 9',
          borderRadius: 22,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1C1F25 0%, #0A0B0D 70%)',
          border: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Ambient glow behind device */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 520, height: 520, borderRadius: '50%',
            background: 'radial-gradient(circle, var(--signal-soft) 0%, transparent 55%)',
            pointerEvents: 'none',
          }}/>

          {/* Horizontal floor plane / reflection */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to top, rgba(255,255,255,0.03), transparent)',
            pointerEvents: 'none',
          }}/>

          {/* Grid lines for depth */}
          <svg viewBox="0 0 800 450" preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.4, pointerEvents: 'none' }}>
            {[0.6, 0.7, 0.8, 0.9, 1.0].map((y, i) => (
              <line key={i} x1="0" y1={y * 450} x2="800" y2={y * 450}
                stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            ))}
          </svg>

          {/* SVG product — detailed isometric Beacon G2 */}
          <svg viewBox="0 0 460 440" style={{ width: '56%', height: 'auto', position: 'relative', zIndex: 2,
            filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.7))' }}>
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

            {/* Shadow under device */}
            <ellipse cx="230" cy="420" rx="180" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)"/>

            {/* Antenna / mast */}
            <g>
              <rect x="120" y="28" width="4" height="60" rx="2" fill="#2A2E36"/>
              <rect x="336" y="28" width="4" height="60" rx="2" fill="#2A2E36"/>
              {/* Antenna caps w/ LED */}
              <circle cx="122" cy="26" r="6" fill="#14161A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              <circle cx="338" cy="26" r="6" fill="#14161A" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
              <circle cx="122" cy="26" r="2" fill="oklch(0.86 0.17 118)"/>
              <circle cx="338" cy="26" r="2" fill="oklch(0.86 0.17 118)"/>
            </g>

            {/* Main body — monolithic black block w/ beveled top */}
            <g>
              {/* Back face (slight offset for 3D) */}
              <path d="M 70 100 L 390 100 L 400 110 L 400 390 L 60 390 L 60 110 Z" fill="url(#sideGrad)"/>
              {/* Front face */}
              <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#bodyGrad)"/>
              {/* Top bevel highlight */}
              <rect x="60" y="100" width="340" height="14" rx="8" fill="url(#topGrad)"/>
              {/* Sheen overlay */}
              <rect x="60" y="100" width="340" height="200" rx="18" fill="url(#sheen)"/>
              {/* Micro-perforated grille texture */}
              <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#micro)" opacity="0.6"/>
            </g>

            {/* Glass face — display strip */}
            <g>
              <rect x="82" y="132" width="296" height="56" rx="6" fill="#050607" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5"/>
              {/* Bars/data viz on display */}
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
              {/* "Signal" label on display */}
              <text x="162" y="160" fontFamily="ui-monospace,monospace" fontSize="7"
                letterSpacing="1" fill="oklch(0.86 0.17 118)">NR n77</text>
              <text x="162" y="172" fontFamily="ui-monospace,monospace" fontSize="7"
                letterSpacing="1" fill="#8E939D">-68 dBm</text>
              {/* Vertical separator */}
              <line x1="248" y1="140" x2="248" y2="180" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
              {/* Right readout */}
              <text x="262" y="152" fontFamily="ui-monospace,monospace" fontSize="7"
                letterSpacing="1" fill="#8E939D">DOWN</text>
              <text x="262" y="164" fontFamily="ui-monospace,monospace" fontSize="10"
                fill="#F4F1EC" fontWeight="500">942</text>
              <text x="290" y="164" fontFamily="ui-monospace,monospace" fontSize="7" fill="#8E939D">Mbps</text>
              <text x="262" y="176" fontFamily="ui-monospace,monospace" fontSize="7" fill="#5A606C">↑ 312 Mbps</text>
            </g>

            {/* LED indicator row */}
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

            {/* Horizontal vent grille — center band */}
            <g>
              <rect x="82" y="250" width="296" height="64" rx="4" fill="#050607" opacity="0.6"/>
              {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
                <line key={i} x1="88" y1={258 + i * 4} x2="372" y2={258 + i * 4}
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              ))}
            </g>

            {/* Bottom brand plate */}
            <g>
              <rect x="82" y="332" width="296" height="36" rx="4" fill="#050607" opacity="0.4"/>
              <text x="96" y="356" fontFamily="ui-monospace,monospace" fontSize="10"
                letterSpacing="3" fill="#F4F1EC" fontWeight="500">FASTNET</text>
              <line x1="166" y1="348" x2="166" y2="360" stroke="#3A3F49" strokeWidth="1"/>
              <text x="178" y="356" fontFamily="ui-monospace,monospace" fontSize="9"
                letterSpacing="2" fill="#8E939D">BEACON · G2</text>
              <text x="300" y="356" fontFamily="ui-monospace,monospace" fontSize="8"
                letterSpacing="1" fill="#5A606C">BEA-2041-78</text>
            </g>

            {/* Reflection on floor */}
            <g opacity="0.25" transform="translate(0, 792) scale(1, -1)">
              <rect x="60" y="100" width="340" height="290" rx="18" fill="url(#bodyGrad)"/>
            </g>
          </svg>

          {/* Floating spec callouts */}
          <div style={{
            position: 'absolute', top: '16%', right: '8%',
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(10,11,13,0.75)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
            zIndex: 3, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span className="signal-dot" style={{ width: 6, height: 6 }}/>
            <div>
              <div style={{ color: 'var(--signal)', fontSize: 9, letterSpacing: '0.12em' }}>RADIOS</div>
              <div style={{ color: 'var(--bone-100)' }}>5G mmWave · Sub-6</div>
            </div>
          </div>
          <div style={{
            position: 'absolute', top: '14%', left: '6%',
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(10,11,13,0.75)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            zIndex: 3,
          }}>
            <div style={{ color: 'var(--signal)', fontSize: 9, letterSpacing: '0.12em' }}>PEAK</div>
            <div style={{ color: 'var(--bone-100)' }}>3.4 Gbps</div>
          </div>
          <div style={{
            position: 'absolute', bottom: '20%', left: '6%',
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(10,11,13,0.75)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            zIndex: 3,
          }}>
            <div style={{ color: 'var(--signal)', fontSize: 9, letterSpacing: '0.12em' }}>SIM</div>
            <div style={{ color: 'var(--bone-100)' }}>Dual · Carrier diverse</div>
          </div>
          <div style={{
            position: 'absolute', bottom: '18%', right: '8%',
            padding: '10px 14px', borderRadius: 10,
            background: 'rgba(10,11,13,0.75)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            zIndex: 3,
          }}>
            <div style={{ color: 'var(--signal)', fontSize: 9, letterSpacing: '0.12em' }}>I/O</div>
            <div style={{ color: 'var(--bone-100)' }}>2.5GbE · SFP+</div>
          </div>

          {/* Connection line to callout */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
            <line x1="20%" y1="22%" x2="34%" y2="34%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
            <line x1="80%" y1="22%" x2="66%" y2="34%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
            <line x1="20%" y1="74%" x2="34%" y2="62%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
            <line x1="80%" y1="76%" x2="66%" y2="62%" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" strokeDasharray="2 3"/>
          </svg>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 48 }}>
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
};

// ——— Variant C: Animated signal / technical ———
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

      // concentric signal rings
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

      // center dot
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
    <section style={{
      padding: '80px 0 0',
      background: 'var(--ink-900)',
      color: 'var(--bone-100)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="signal-dot" />
            <span className="mono-label" style={{ color: 'var(--signal)' }}>Signal integrity · 99.97%</span>
          </div>
          <span className="mono-label">Primary · Failover · Always</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <h1 className="display-2" style={{ margin: 0 }}>
              Signal is{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--signal)' }}>infrastructure</span>.
              <br/>
              We treat it that way.
            </h1>
            <p className="body-lg" style={{ maxWidth: '40ch', color: 'var(--ink-200)', marginTop: 28 }}>
              FastNet is a managed 5G service for the places a modem and a hope won't do.
              Custom hardware, carrier-diverse routing, hands-on installation by our network team.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 40 }}>
              <button className="btn btn-lg btn-signal" onClick={() => go('pricing')}>
                Plans & pricing <Arrow size={14}/>
              </button>
              <button className="btn btn-lg btn-ghost" onClick={() => go('consultation')}>
                Schedule a consultation
              </button>
            </div>
          </div>

          {/* Signal canvas */}
          <div style={{
            position: 'relative',
            aspectRatio: '1 / 1',
            borderRadius: 22,
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 60%, rgba(205,235,90,0.08), transparent 60%)',
          }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }}/>
            {/* Corner telemetry */}
            <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="mono-sm" style={{ color: 'var(--ink-300)' }}>LAT 34.0194°N</span>
              <span className="mono-sm" style={{ color: 'var(--ink-300)' }}>LNG 118.4912°W</span>
            </div>
            <div style={{ position: 'absolute', top: 18, right: 18, textAlign: 'right' }}>
              <div className="mono-label" style={{ color: 'var(--signal)' }}>Tx/Rx</div>
              <div className="mono-sm" style={{ color: 'var(--ink-200)' }}>n41 · n77 · n258</div>
            </div>
            <div style={{ position: 'absolute', bottom: 18, left: 18 }}>
              <div className="mono-label">Uplink</div>
              <div className="mono-sm" style={{ color: 'var(--ink-100)' }}>312 Mbps</div>
            </div>
            <div style={{ position: 'absolute', bottom: 18, right: 18, textAlign: 'right' }}>
              <div className="mono-label">Downlink</div>
              <div className="mono-sm" style={{ color: 'var(--ink-100)' }}>940 Mbps</div>
            </div>
          </div>
        </div>

        {/* Bottom rail */}
        <div style={{
          marginTop: 100,
          padding: '32px 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span className="mono-label">Trusted by integrators serving</span>
          <div style={{ display: 'flex', gap: 48, alignItems: 'center', color: 'var(--ink-300)' }}>
            {['CRESTRON CERTIFIED','SAVANT PARTNER','LUTRON RA3','CONTROL4','SMART HOME'].map(b => (
              <span key={b} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em' }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroEditorial, HeroProduct, HeroSignal });
