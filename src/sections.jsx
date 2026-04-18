// FastNet — Homepage sections below the hero

// Failover vs Primary explainer
const FailoverExplainer = ({ go }) => {
  const [mode, setMode] = React.useState('failover'); // or 'primary'

  return (
    <section style={{ padding: '140px 0', background: 'var(--bone-100)', color: 'var(--ink-900)' }}>
      <div className="container">
        <SectionTag number="02">Two deployments, one network</SectionTag>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <h2 className="headline" style={{ margin: 0, maxWidth: '14ch' }}>
              Failover or primary. The difference is everything.
            </h2>
            <div style={{ display: 'flex', gap: 4, marginTop: 48, padding: 4,
              background: 'var(--bone-200)', borderRadius: 999, width: 'fit-content' }}>
              {[
                { k: 'failover', l: 'Failover' },
                { k: 'primary', l: 'Primary' },
              ].map(t => (
                <button key={t.k} onClick={() => setMode(t.k)}
                  style={{
                    padding: '10px 22px', borderRadius: 999, fontSize: 14, fontWeight: 500,
                    background: mode === t.k ? 'var(--ink-900)' : 'transparent',
                    color: mode === t.k ? 'var(--bone-100)' : 'var(--ink-500)',
                    transition: 'all .2s ease',
                  }}>
                  {t.l}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 32, minHeight: 180 }}>
              {mode === 'failover' ? (
                <>
                  <p className="body-lg" style={{ margin: 0, maxWidth: '42ch' }}>
                    You already have fiber. It's fast — until the morning it isn't.
                    FastNet sits quietly alongside your primary circuit, tests continuously,
                    and switches to 5G within 400ms when your ISP drops.
                  </p>
                  <p className="body" style={{ color: 'var(--ink-400)', marginTop: 16, maxWidth: '42ch' }}>
                    Video calls keep going. Security cameras keep recording.
                    Smart home keeps listening. No one in the house knows anything happened.
                  </p>
                </>
              ) : (
                <>
                  <p className="body-lg" style={{ margin: 0, maxWidth: '42ch' }}>
                    Fiber isn't everywhere — and waiting for a trenching crew isn't a plan.
                    FastNet Primary delivers carrier-diverse 5G as your sole connection,
                    engineered and tuned for your site.
                  </p>
                  <p className="body" style={{ color: 'var(--ink-400)', marginTop: 16, maxWidth: '42ch' }}>
                    We survey your property, pick the best sector, and install a professional
                    gateway — often the same day. You get residential-fiber speeds without the fiber.
                  </p>
                </>
              )}
            </div>

            <button className="btn btn-primary" onClick={() => go('how')}
              style={{ marginTop: 32 }}>
              Deep dive on the technology <Arrow size={12}/>
            </button>
          </div>

          {/* Diagram */}
          <FailoverDiagram mode={mode} />
        </div>
      </div>
    </section>
  );
};

// Interactive network diagram — premium dark terminal-style
const FailoverDiagram = ({ mode }) => {
  const [simulateOutage, setSimulateOutage] = React.useState(false);
  const [switchMs, setSwitchMs] = React.useState(340);

  React.useEffect(() => {
    if (mode !== 'failover') return;
    const id = setInterval(() => {
      setSimulateOutage(s => !s);
      setSwitchMs(280 + Math.round(Math.random() * 140));
    }, 4500);
    return () => clearInterval(id);
  }, [mode]);

  const primaryActive = mode === 'primary' || !simulateOutage;
  const fastnetActive = mode === 'primary' || simulateOutage;

  const statusText = mode === 'failover'
    ? (simulateOutage ? 'ISP offline · failover engaged' : 'ISP online · FastNet standby')
    : 'FastNet primary · nominal';
  const statusColor = mode === 'failover' && simulateOutage
    ? 'oklch(0.78 0.16 80)'
    : 'oklch(0.76 0.16 155)';

  return (
    <div style={{
      aspectRatio: '5 / 4',
      background: 'linear-gradient(160deg, #14161A 0%, #0A0B0D 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 18,
      padding: 0,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      color: 'var(--bone-100)',
    }}>
      {/* Subtle grid backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
      }}/>

      {/* Terminal header */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor,
            boxShadow: `0 0 10px ${statusColor}`,
            animation: 'pulse 2s ease-in-out infinite' }}/>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--bone-100)' }}>
            {statusText}
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em',
          color: 'var(--ink-400)' }}>
          NETWORK.LIVE
        </span>
      </div>

      {/* Main diagram */}
      <div style={{ position: 'relative', zIndex: 2, padding: 24 }}>
        <svg viewBox="0 0 500 340" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="flowFiber" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(244,241,236,0)"/>
              <stop offset="50%" stopColor="#F4F1EC"/>
              <stop offset="100%" stopColor="rgba(244,241,236,0)"/>
            </linearGradient>
            <linearGradient id="flow5g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(205,235,90,0)"/>
              <stop offset="50%" stopColor="oklch(0.86 0.17 118)"/>
              <stop offset="100%" stopColor="rgba(205,235,90,0)"/>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* ======= FIBER ISP (only in failover mode) ======= */}
          {mode === 'failover' && (
            <g opacity={primaryActive ? 1 : 0.35}>
              {/* Node box */}
              <rect x="20" y="56" width="130" height="64" rx="10"
                fill="rgba(255,255,255,0.03)"
                stroke={primaryActive ? 'rgba(244,241,236,0.35)' : 'rgba(244,241,236,0.15)'}
                strokeWidth="1"/>
              {/* Icon — fiber plug */}
              <g transform="translate(34, 76)">
                <rect x="0" y="0" width="18" height="14" rx="2" fill="none"
                  stroke={primaryActive ? '#F4F1EC' : '#5A606C'} strokeWidth="1"/>
                <line x1="18" y1="7" x2="26" y2="7" stroke={primaryActive ? '#F4F1EC' : '#5A606C'} strokeWidth="1.2"/>
                <circle cx="28" cy="7" r="2" fill={primaryActive ? '#F4F1EC' : '#5A606C'}/>
              </g>
              <text x="70" y="82" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="1.5"
                fill={primaryActive ? '#F4F1EC' : '#8E939D'}>FIBER · ISP</text>
              <text x="70" y="98" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1"
                fill={primaryActive ? 'oklch(0.76 0.16 155)' : 'oklch(0.78 0.16 80)'}>
                {primaryActive ? '● ONLINE' : '● OFFLINE'}
              </text>
              <text x="70" y="110" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1"
                fill="#5A606C">
                {primaryActive ? '12 ms · 940 Mbps' : 'last seen 00:04s'}
              </text>

              {/* Connection wire to beacon */}
              <path d="M 150 88 L 290 88 Q 310 88 310 108 L 310 130"
                fill="none"
                stroke={primaryActive ? 'rgba(244,241,236,0.3)' : 'rgba(244,241,236,0.1)'}
                strokeWidth="1.2"
                strokeDasharray={primaryActive ? '0' : '3 4'}/>

              {/* Data packets flowing */}
              {primaryActive && [0, 0.5].map(delay => (
                <circle key={delay} r="2.5" fill="#F4F1EC" filter="url(#glow)">
                  <animateMotion dur="2s" repeatCount="indefinite" begin={`${delay}s`}
                    path="M 150 88 L 290 88 Q 310 88 310 108 L 310 130"/>
                </circle>
              ))}
            </g>
          )}

          {/* ======= 5G TOWER ======= */}
          <g opacity={fastnetActive ? 1 : 0.4}>
            <rect x="20" y={mode === 'failover' ? 200 : 138} width="130" height="64" rx="10"
              fill={fastnetActive ? 'rgba(205,235,90,0.08)' : 'rgba(255,255,255,0.03)'}
              stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : 'rgba(244,241,236,0.15)'}
              strokeWidth="1"/>
            {/* Tower icon */}
            <g transform={`translate(34, ${mode === 'failover' ? 215 : 153})`}>
              <line x1="10" y1="0" x2="10" y2="26" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1.2"/>
              <line x1="4"  y1="10" x2="16" y2="10" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1"/>
              <line x1="0"  y1="0"  x2="10" y2="14" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1"/>
              <line x1="20" y1="0"  x2="10" y2="14" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1"/>
              {/* Signal waves */}
              {fastnetActive && [6, 10, 14].map((r, i) => (
                <circle key={i} cx="10" cy="-2" r={r} fill="none"
                  stroke="oklch(0.86 0.17 118)" strokeWidth="0.8" opacity={0.8 - i * 0.2}>
                  <animate attributeName="r" from={r - 4} to={r} dur="1.4s"
                    repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                  <animate attributeName="opacity" from="0.8" to="0" dur="1.4s"
                    repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                </circle>
              ))}
            </g>
            <text x="70" y={mode === 'failover' ? 224 : 162} fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="1.5"
              fill={fastnetActive ? '#F4F1EC' : '#8E939D'}>FASTNET · 5G</text>
            <text x="70" y={mode === 'failover' ? 240 : 178} fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1"
              fill={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'}>
              ● {fastnetActive ? (mode === 'primary' ? 'PRIMARY' : 'CARRYING') : 'STANDBY'}
            </text>
            <text x="70" y={mode === 'failover' ? 252 : 190} fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1"
              fill="#5A606C">
              {fastnetActive ? 'n41 · n77 · -68dBm' : 'armed · 0% traffic'}
            </text>

            {/* Wire to beacon */}
            <path d={`M 150 ${mode === 'failover' ? 232 : 170} L 290 ${mode === 'failover' ? 232 : 170} Q 310 ${mode === 'failover' ? 232 : 170} 310 ${mode === 'failover' ? 212 : 190} L 310 ${mode === 'failover' ? 190 : 170}`}
              fill="none"
              stroke={fastnetActive ? 'oklch(0.86 0.17 118 / 0.6)' : 'rgba(205,235,90,0.15)'}
              strokeWidth="1.2"
              strokeDasharray={fastnetActive ? '0' : '3 4'}/>

            {fastnetActive && [0, 0.5].map(delay => (
              <circle key={delay} r="2.5" fill="oklch(0.86 0.17 118)" filter="url(#glow)">
                <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${delay}s`}
                  path={`M 150 ${mode === 'failover' ? 232 : 170} L 290 ${mode === 'failover' ? 232 : 170} Q 310 ${mode === 'failover' ? 232 : 170} 310 ${mode === 'failover' ? 212 : 190} L 310 ${mode === 'failover' ? 190 : 170}`}/>
              </circle>
            ))}
          </g>

          {/* ======= BEACON G2 (center) ======= */}
          <g>
            {/* Glow halo */}
            <ellipse cx="310" cy="170" rx="44" ry="28" fill="oklch(0.86 0.17 118 / 0.12)" filter="url(#glow)"/>
            {/* Device body */}
            <rect x="270" y="140" width="80" height="72" rx="10"
              fill="#1C1F25" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            {/* Display strip */}
            <rect x="278" y="148" width="64" height="18" rx="2" fill="#050607"/>
            {/* Mini bars */}
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={282 + i * 4} y={152 + (i%2) * 2} width="2" height={10 - (i%2) * 2}
                fill="oklch(0.86 0.17 118)" opacity={0.5 + (i * 0.1)}/>
            ))}
            <text x="310" y="162" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6"
              letterSpacing="1" fill="#F4F1EC">NR</text>
            {/* Status LEDs */}
            <circle cx="284" cy="180" r="2.2" fill={primaryActive && mode === 'failover' ? '#F4F1EC' : '#2A2E36'}/>
            <circle cx="294" cy="180" r="2.2" fill={fastnetActive ? 'oklch(0.86 0.17 118)' : '#2A2E36'}/>
            <circle cx="304" cy="180" r="2.2" fill="oklch(0.76 0.16 155)"/>
            <circle cx="314" cy="180" r="2.2" fill="#2A2E36"/>
            {/* Label */}
            <text x="310" y="199" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8"
              letterSpacing="2" fill="#F4F1EC" fontWeight="500">BEACON · G2</text>
            <text x="310" y="230" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7"
              letterSpacing="1"
              fill={simulateOutage && mode === 'failover' ? 'oklch(0.86 0.17 118)' : '#8E939D'}>
              {simulateOutage && mode === 'failover' ? `↻ switched in ${switchMs}ms` : 'all paths healthy'}
            </text>
          </g>

          {/* ======= HOME / CLIENT ======= */}
          <g>
            {/* Wire out */}
            <path d="M 350 170 L 430 170"
              stroke="rgba(244,241,236,0.5)" strokeWidth="1.2"/>
            {/* House icon */}
            <g transform="translate(430, 132)">
              <rect x="0" y="24" width="48" height="40" rx="2"
                fill="rgba(255,255,255,0.04)" stroke="rgba(244,241,236,0.4)" strokeWidth="1"/>
              <path d="M -4 26 L 24 4 L 52 26" fill="none"
                stroke="rgba(244,241,236,0.4)" strokeWidth="1" strokeLinejoin="round"/>
              <rect x="20" y="44" width="8" height="20" fill="rgba(244,241,236,0.15)"/>
              <rect x="6"  y="36" width="8" height="8" fill="rgba(244,241,236,0.1)"/>
              <rect x="34" y="36" width="8" height="8" fill="rgba(244,241,236,0.1)"/>
            </g>
            <text x="454" y="210" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8"
              letterSpacing="2" fill="#8E939D">CLIENT · LAN</text>
            <text x="454" y="222" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7"
              letterSpacing="1" fill="#5A606C">42 devices</text>
          </g>

          {/* ======= Metrics strip bottom ======= */}
          <g transform="translate(0, 290)">
            <line x1="20" y1="0" x2="480" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x="20"  y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">LATENCY</text>
            <text x="20"  y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">
              {simulateOutage && mode === 'failover' ? '22 ms' : '14 ms'}
            </text>

            <text x="140" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">THROUGHPUT</text>
            <text x="140" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">
              {simulateOutage && mode === 'failover' ? '742 Mbps' : '940 Mbps'}
            </text>

            <text x="280" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">PACKETS LOST</text>
            <text x="280" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">0.00%</text>

            <text x="400" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">UPTIME</text>
            <text x="400" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="oklch(0.76 0.16 155)">99.997%</text>
          </g>
        </svg>
      </div>

      {mode === 'failover' && (
        <button onClick={() => setSimulateOutage(s => !s)}
          style={{
            position: 'absolute', bottom: 16, right: 16,
            padding: '10px 16px', borderRadius: 999,
            background: simulateOutage ? 'oklch(0.86 0.17 118)' : 'rgba(255,255,255,0.06)',
            color: simulateOutage ? 'var(--ink-900)' : 'var(--bone-100)',
            border: '1px solid rgba(255,255,255,0.12)',
            fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
            fontWeight: 500,
            zIndex: 3,
            transition: 'all .18s',
          }}>
          {simulateOutage ? '↺ RESTORE ISP' : '⚡ SIMULATE OUTAGE'}
        </button>
      )}
    </div>
  );
};

// Feature grid / principles
const Principles = () => {
  const items = [
    {
      n: 'I',
      title: 'Carrier-diverse by design',
      body: 'Dual-SIM gateways run two independent carriers. A tower problem on one network is a non-event.',
    },
    {
      n: 'II',
      title: 'Monitored, not just installed',
      body: 'Every Beacon reports back to our operations center every 30 seconds. We often fix problems before you notice.',
    },
    {
      n: 'III',
      title: 'Installed by specialists',
      body: 'A network engineer — not a contractor — surveys signal, plans antenna placement, and configures your site end-to-end.',
    },
    {
      n: 'IV',
      title: 'Private routing',
      body: 'Optional private APN and static IPs route your traffic through a hardened backbone. No carrier-grade NAT, no surprises.',
    },
    {
      n: 'V',
      title: 'Integrates with what you have',
      body: 'Works alongside Crestron, Savant, Control4, Lutron, and any home firewall. One clean handoff.',
    },
    {
      n: 'VI',
      title: 'Priced like utilities',
      body: 'Flat monthly rate. No metered overages. No surprise equipment fees. Cancel the day fiber arrives.',
    },
  ];
  return (
    <section style={{ padding: '140px 0', background: 'var(--bone-50)', color: 'var(--ink-900)',
      borderTop: '1px solid var(--ink-100)', borderBottom: '1px solid var(--ink-100)' }}>
      <div className="container">
        <SectionTag number="03">Principles</SectionTag>
        <h2 className="headline" style={{ margin: 0, maxWidth: '20ch', marginBottom: 80 }}>
          What we got tired of settling for. What we decided to build instead.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
          background: 'var(--ink-100)',
          border: '1px solid var(--ink-100)',
        }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                background: 'var(--bone-50)',
                padding: '40px 32px',
                minHeight: 280,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
                  <span className="mono-label">{it.n}</span>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--signal)' }}/>
                </div>
                <h3 className="title" style={{ margin: 0, marginBottom: 14 }}>{it.title}</h3>
                <p className="body" style={{ color: 'var(--ink-400)', margin: 0, maxWidth: '32ch' }}>
                  {it.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials / pull quote
const PullQuote = () => (
  <section style={{ padding: '160px 0', background: 'var(--bone-100)', color: 'var(--ink-900)' }}>
    <div className="container">
      <div style={{ maxWidth: 920 }}>
        <span className="mono-label" style={{ color: 'var(--signal-dim)' }}>CASE · 048</span>
        <blockquote className="display-2" style={{
          margin: '28px 0 0',
          fontStyle: 'italic',
          maxWidth: '20ch',
        }}>
          "It rained for four days. Comcast went down twice.<br/>
          We never found out until the monthly report."
        </blockquote>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 40 }}>
          <div className="placeholder" style={{ width: 52, height: 52, borderRadius: '50%' }}>
            A
          </div>
          <div>
            <div style={{ fontWeight: 500 }}>Alessandra Moreau</div>
            <div className="caption">Estate manager · Pacific Palisades · FastNet since 2024</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Final CTA
const FinalCTA = ({ go }) => (
  <section style={{
    padding: '140px 0',
    background: 'var(--ink-900)',
    color: 'var(--bone-100)',
    position: 'relative',
    overflow: 'hidden',
  }}>
    <div style={{
      position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)',
      width: 700, height: 700,
      background: 'radial-gradient(circle, var(--signal-soft) 0%, transparent 60%)',
      pointerEvents: 'none',
    }}/>
    <div className="container" style={{ position: 'relative' }}>
      <div style={{ maxWidth: 800 }}>
        <SectionTag number="06">Next</SectionTag>
        <h2 className="display-2" style={{ margin: 0 }}>
          Let's see if FastNet is right for your address.
        </h2>
        <p className="body-lg" style={{ color: 'var(--ink-200)', marginTop: 24, maxWidth: '50ch' }}>
          Check 5G coverage in 30 seconds. If your signal qualifies,
          we'll schedule a survey. If it doesn't, we'll tell you — and we won't try to sell you anything.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 48, flexWrap: 'wrap' }}>
          <button className="btn btn-lg btn-signal" onClick={() => go('availability')}>
            Check availability <Arrow size={14}/>
          </button>
          <button className="btn btn-lg btn-ghost" onClick={() => go('consultation')}>
            Talk to an engineer
          </button>
        </div>
      </div>
    </div>
  </section>
);

// Footer
const Footer = ({ go }) => (
  <footer style={{
    background: 'var(--ink-900)',
    color: 'var(--ink-200)',
    padding: '64px 0 40px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
  }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }}>
        <div>
          <div style={{ color: 'var(--bone-100)' }}>
            <Logo />
          </div>
          <p className="caption" style={{ color: 'var(--ink-300)', marginTop: 16, maxWidth: '32ch' }}>
            Managed 5G internet for homes, businesses, and the systems that run them.
            A service of a luxury AV & network integration practice based in Southern California.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24 }}>
            <span className="signal-dot" />
            <span className="mono-label" style={{ color: 'var(--signal)' }}>Network operational</span>
          </div>
        </div>

        {[
          { t: 'Service', l: [['How it works','how'], ['Use cases','usecases'], ['Pricing','pricing'], ['Dashboard','dashboard']] },
          { t: 'Get started', l: [['Check availability','availability'], ['Schedule consult','consultation'], ['Order FastNet','pricing']] },
          { t: 'Company', l: [['About','#'], ['Integrators','#'], ['Press','#']] },
          { t: 'Support', l: [['Status','#'], ['Docs','#'], ['Contact','#']] },
        ].map((col, i) => (
          <div key={i}>
            <div className="mono-label" style={{ color: 'var(--ink-300)', marginBottom: 18 }}>{col.t}</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.l.map((it, j) => (
                <li key={j}>
                  <button onClick={() => typeof it[1] === 'string' && it[1] !== '#' && go(it[1])}
                    style={{ color: 'var(--bone-100)', fontSize: 14 }}>
                    {it[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{
        paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em',
        color: 'var(--ink-400)',
      }}>
        <div>© 2026 FASTNET · A SERVICE OF MERIDIAN AV</div>
        <div style={{ display: 'flex', gap: 32 }}>
          <span>LOS ANGELES · ORANGE COUNTY · SAN DIEGO</span>
          <span>PRIVACY</span>
          <span>TERMS</span>
          <span>SLA</span>
        </div>
      </div>
    </div>
  </footer>
);

Object.assign(window, { FailoverExplainer, Principles, PullQuote, FinalCTA, Footer });
