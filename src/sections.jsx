// FastNet — Homepage sections below the hero

const FailoverExplainer = ({ go }) => {
  const [mode, setMode] = React.useState('failover');

  return (
    <section className="py-14 md:py-32 bg-bone-100 text-ink-900">
      <div className="container-app">
        <SectionTag number="02">Two deployments, one network</SectionTag>

        <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-start">
          <div>
            <h2 className="headline m-0 max-w-[14ch]">Failover or primary. The difference is everything.</h2>

            <div className="inline-flex gap-1 mt-12 p-1 bg-bone-200 rounded-full">
              {[{ k: 'failover', l: 'Failover' }, { k: 'primary', l: 'Primary' }].map(t => (
                <button key={t.k} onClick={() => setMode(t.k)} className={cn(
                  'px-5.5 py-2.5 rounded-full text-sm font-medium transition-all',
                  mode === t.k ? 'bg-ink-900 text-bone-100' : 'bg-transparent text-ink-500'
                )}>
                  {t.l}
                </button>
              ))}
            </div>

            <div className="mt-8 min-h-[180px]">
              {mode === 'failover' ? (
                <>
                  <p className="body-lg m-0 max-w-[42ch]">
                    You already have fiber. It's fast — until the morning it isn't.
                    FastNet sits quietly alongside your primary circuit, tests continuously,
                    and switches to 5G within 400ms when your ISP drops.
                  </p>
                  <p className="body text-ink-400 mt-4 max-w-[42ch]">
                    Video calls keep going. Security cameras keep recording.
                    Smart home keeps listening. No one in the house knows anything happened.
                  </p>
                </>
              ) : (
                <>
                  <p className="body-lg m-0 max-w-[42ch]">
                    Fiber isn't everywhere — and waiting for a trenching crew isn't a plan.
                    FastNet Primary delivers carrier-diverse 5G as your sole connection,
                    engineered and tuned for your site.
                  </p>
                  <p className="body text-ink-400 mt-4 max-w-[42ch]">
                    We survey your property, pick the best sector, and install a professional
                    gateway — often the same day. You get residential-fiber speeds without the fiber.
                  </p>
                </>
              )}
            </div>

            <button className="btn btn-primary mt-8" onClick={() => go('how')}>
              Deep dive on the technology <Arrow size={12}/>
            </button>
          </div>

          <FailoverDiagram mode={mode} />
        </div>
      </div>
    </section>
  );
};

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
    ? 'oklch(0.78 0.16 80)' : 'oklch(0.76 0.16 155)';

  return (
    <div className="aspect-square md:aspect-[5/4] border border-white/[0.08] rounded-[18px] relative overflow-hidden text-bone-100"
      style={{
        background: 'linear-gradient(160deg, #14161A 0%, #0A0B0D 100%)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.25)',
      }}>
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent)',
        }}/>

      <div className="relative z-[2] flex justify-between items-center px-5 py-4 border-b border-white/[0.06] bg-black/20">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full"
            style={{ background: statusColor, boxShadow: `0 0 10px ${statusColor}`, animation: 'pulse 2s ease-in-out infinite' }}/>
          <span className="font-mono text-[11px] tracking-wider uppercase text-bone-100">{statusText}</span>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-ink-400">NETWORK.LIVE</span>
      </div>

      <div className="relative z-[2] p-6">
        <svg viewBox="0 0 500 340" className="w-full h-auto block">
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

          {mode === 'failover' && (
            <g opacity={primaryActive ? 1 : 0.35}>
              <rect x="20" y="56" width="130" height="64" rx="10"
                fill="rgba(255,255,255,0.03)"
                stroke={primaryActive ? 'rgba(244,241,236,0.35)' : 'rgba(244,241,236,0.15)'} strokeWidth="1"/>
              <g transform="translate(34, 76)">
                <rect x="0" y="0" width="18" height="14" rx="2" fill="none" stroke={primaryActive ? '#F4F1EC' : '#5A606C'} strokeWidth="1"/>
                <line x1="18" y1="7" x2="26" y2="7" stroke={primaryActive ? '#F4F1EC' : '#5A606C'} strokeWidth="1.2"/>
                <circle cx="28" cy="7" r="2" fill={primaryActive ? '#F4F1EC' : '#5A606C'}/>
              </g>
              <text x="70" y="82" fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="1.5" fill={primaryActive ? '#F4F1EC' : '#8E939D'}>FIBER · ISP</text>
              <text x="70" y="98" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1" fill={primaryActive ? 'oklch(0.76 0.16 155)' : 'oklch(0.78 0.16 80)'}>
                {primaryActive ? '● ONLINE' : '● OFFLINE'}
              </text>
              <text x="70" y="110" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#5A606C">
                {primaryActive ? '12 ms · 940 Mbps' : 'last seen 00:04s'}
              </text>
              <path d="M 150 88 L 290 88 Q 310 88 310 108 L 310 130" fill="none"
                stroke={primaryActive ? 'rgba(244,241,236,0.3)' : 'rgba(244,241,236,0.1)'} strokeWidth="1.2"
                strokeDasharray={primaryActive ? '0' : '3 4'}/>
              {primaryActive && [0, 0.5].map(d => (
                <circle key={d} r="2.5" fill="#F4F1EC" filter="url(#glow)">
                  <animateMotion dur="2s" repeatCount="indefinite" begin={`${d}s`} path="M 150 88 L 290 88 Q 310 88 310 108 L 310 130"/>
                </circle>
              ))}
            </g>
          )}

          <g opacity={fastnetActive ? 1 : 0.4}>
            <rect x="20" y={mode === 'failover' ? 200 : 138} width="130" height="64" rx="10"
              fill={fastnetActive ? 'rgba(205,235,90,0.08)' : 'rgba(255,255,255,0.03)'}
              stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : 'rgba(244,241,236,0.15)'} strokeWidth="1"/>
            <g transform={`translate(34, ${mode === 'failover' ? 215 : 153})`}>
              <line x1="10" y1="0" x2="10" y2="26" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1.2"/>
              <line x1="4"  y1="10" x2="16" y2="10" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1"/>
              <line x1="0"  y1="0"  x2="10" y2="14" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1"/>
              <line x1="20" y1="0"  x2="10" y2="14" stroke={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'} strokeWidth="1"/>
              {fastnetActive && [6, 10, 14].map((r, i) => (
                <circle key={i} cx="10" cy="-2" r={r} fill="none" stroke="oklch(0.86 0.17 118)" strokeWidth="0.8" opacity={0.8 - i * 0.2}>
                  <animate attributeName="r" from={r - 4} to={r} dur="1.4s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                  <animate attributeName="opacity" from="0.8" to="0" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                </circle>
              ))}
            </g>
            <text x="70" y={mode === 'failover' ? 224 : 162} fontFamily="ui-monospace,monospace" fontSize="9" letterSpacing="1.5" fill={fastnetActive ? '#F4F1EC' : '#8E939D'}>FASTNET · 5G</text>
            <text x="70" y={mode === 'failover' ? 240 : 178} fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="1" fill={fastnetActive ? 'oklch(0.86 0.17 118)' : '#5A606C'}>
              ● {fastnetActive ? (mode === 'primary' ? 'PRIMARY' : 'CARRYING') : 'STANDBY'}
            </text>
            <text x="70" y={mode === 'failover' ? 252 : 190} fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#5A606C">
              {fastnetActive ? 'n41 · n77 · -68dBm' : 'armed · 0% traffic'}
            </text>
            <path d={`M 150 ${mode === 'failover' ? 232 : 170} L 290 ${mode === 'failover' ? 232 : 170} Q 310 ${mode === 'failover' ? 232 : 170} 310 ${mode === 'failover' ? 212 : 190} L 310 ${mode === 'failover' ? 190 : 170}`}
              fill="none"
              stroke={fastnetActive ? 'oklch(0.86 0.17 118 / 0.6)' : 'rgba(205,235,90,0.15)'}
              strokeWidth="1.2" strokeDasharray={fastnetActive ? '0' : '3 4'}/>
            {fastnetActive && [0, 0.5].map(d => (
              <circle key={d} r="2.5" fill="oklch(0.86 0.17 118)" filter="url(#glow)">
                <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${d}s`}
                  path={`M 150 ${mode === 'failover' ? 232 : 170} L 290 ${mode === 'failover' ? 232 : 170} Q 310 ${mode === 'failover' ? 232 : 170} 310 ${mode === 'failover' ? 212 : 190} L 310 ${mode === 'failover' ? 190 : 170}`}/>
              </circle>
            ))}
          </g>

          <g>
            <ellipse cx="310" cy="170" rx="44" ry="28" fill="oklch(0.86 0.17 118 / 0.12)" filter="url(#glow)"/>
            <rect x="270" y="140" width="80" height="72" rx="10" fill="#1C1F25" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
            <rect x="278" y="148" width="64" height="18" rx="2" fill="#050607"/>
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={282 + i * 4} y={152 + (i%2) * 2} width="2" height={10 - (i%2) * 2} fill="oklch(0.86 0.17 118)" opacity={0.5 + (i * 0.1)}/>
            ))}
            <text x="310" y="162" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="6" letterSpacing="1" fill="#F4F1EC">NR</text>
            <circle cx="284" cy="180" r="2.2" fill={primaryActive && mode === 'failover' ? '#F4F1EC' : '#2A2E36'}/>
            <circle cx="294" cy="180" r="2.2" fill={fastnetActive ? 'oklch(0.86 0.17 118)' : '#2A2E36'}/>
            <circle cx="304" cy="180" r="2.2" fill="oklch(0.76 0.16 155)"/>
            <circle cx="314" cy="180" r="2.2" fill="#2A2E36"/>
            <text x="310" y="199" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="2" fill="#F4F1EC" fontWeight="500">BEACON · G2</text>
            <text x="310" y="230" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1"
              fill={simulateOutage && mode === 'failover' ? 'oklch(0.86 0.17 118)' : '#8E939D'}>
              {simulateOutage && mode === 'failover' ? `↻ switched in ${switchMs}ms` : 'all paths healthy'}
            </text>
          </g>

          <g>
            <path d="M 350 170 L 430 170" stroke="rgba(244,241,236,0.5)" strokeWidth="1.2"/>
            <g transform="translate(430, 132)">
              <rect x="0" y="24" width="48" height="40" rx="2" fill="rgba(255,255,255,0.04)" stroke="rgba(244,241,236,0.4)" strokeWidth="1"/>
              <path d="M -4 26 L 24 4 L 52 26" fill="none" stroke="rgba(244,241,236,0.4)" strokeWidth="1" strokeLinejoin="round"/>
              <rect x="20" y="44" width="8" height="20" fill="rgba(244,241,236,0.15)"/>
              <rect x="6"  y="36" width="8" height="8" fill="rgba(244,241,236,0.1)"/>
              <rect x="34" y="36" width="8" height="8" fill="rgba(244,241,236,0.1)"/>
            </g>
            <text x="454" y="210" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="8" letterSpacing="2" fill="#8E939D">CLIENT · LAN</text>
            <text x="454" y="222" textAnchor="middle" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1" fill="#5A606C">42 devices</text>
          </g>

          <g transform="translate(0, 290)">
            <line x1="20" y1="0" x2="480" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
            <text x="20" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">LATENCY</text>
            <text x="20" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">{simulateOutage && mode === 'failover' ? '22 ms' : '14 ms'}</text>
            <text x="140" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">THROUGHPUT</text>
            <text x="140" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">{simulateOutage && mode === 'failover' ? '742 Mbps' : '940 Mbps'}</text>
            <text x="280" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">PACKETS LOST</text>
            <text x="280" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="#F4F1EC">0.00%</text>
            <text x="400" y="18" fontFamily="ui-monospace,monospace" fontSize="7" letterSpacing="1.5" fill="#5A606C">UPTIME</text>
            <text x="400" y="32" fontFamily="ui-monospace,monospace" fontSize="11" fill="oklch(0.76 0.16 155)">99.997%</text>
          </g>
        </svg>
      </div>

      {mode === 'failover' && (
        <button onClick={() => setSimulateOutage(s => !s)}
          className={cn(
            'absolute bottom-4 right-4 px-4 py-2.5 rounded-full border border-white/[0.12]',
            'font-mono text-[10px] tracking-widest font-medium z-[3] transition-all',
            simulateOutage ? 'bg-signal text-ink-900' : 'bg-white/[0.06] text-bone-100'
          )}>
          {simulateOutage ? '↺ RESTORE ISP' : '⚡ SIMULATE OUTAGE'}
        </button>
      )}
    </div>
  );
};

const Principles = () => {
  const items = [
    { n: 'I',   title: 'Carrier-diverse by design',     body: 'Dual-SIM gateways run two independent carriers. A tower problem on one network is a non-event.' },
    { n: 'II',  title: 'Monitored, not just installed', body: 'Every Beacon reports back to our operations center every 30 seconds. We often fix problems before you notice.' },
    { n: 'III', title: 'Installed by specialists',       body: 'A network engineer — not a contractor — surveys signal, plans antenna placement, and configures your site end-to-end.' },
    { n: 'IV',  title: 'Private routing',                body: 'Optional private APN and static IPs route your traffic through a hardened backbone. No carrier-grade NAT, no surprises.' },
    { n: 'V',   title: 'Integrates with what you have', body: 'Works alongside Crestron, Savant, Control4, Lutron, and any home firewall. One clean handoff.' },
    { n: 'VI',  title: 'Priced like utilities',          body: 'Flat monthly rate. No metered overages. No surprise equipment fees. Cancel the day fiber arrives.' },
  ];
  return (
    <section className="py-14 md:py-32 bg-bone-50 text-ink-900 border-y border-ink-100">
      <div className="container-app">
        <SectionTag number="03">Principles</SectionTag>
        <h2 className="headline m-0 max-w-[20ch] mb-12 md:mb-20">
          What we got tired of settling for. What we decided to build instead.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-100 border border-ink-100">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="bg-bone-50 px-8 py-10 min-h-[280px]">
                <div className="flex justify-between mb-7">
                  <span className="mono-label">{it.n}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-signal"/>
                </div>
                <h3 className="title m-0 mb-3.5">{it.title}</h3>
                <p className="body text-ink-400 m-0 max-w-[32ch]">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const PullQuote = () => (
  <section className="py-16 md:py-40 bg-bone-100 text-ink-900">
    <div className="container-app">
      <div className="max-w-[920px]">
        <span className="mono-label text-[var(--color-signal-dim)]">CASE · 048</span>
        <blockquote className="display-2 mt-7 italic max-w-[20ch]">
          "It rained for four days. Comcast went down twice.<br/>
          We never found out until the monthly report."
        </blockquote>
        <div className="flex gap-5 items-center mt-10">
          <div className="placeholder w-13 h-13 rounded-full" style={{ width: 52, height: 52 }}>A</div>
          <div>
            <div className="font-medium">Alessandra Moreau</div>
            <div className="caption">Estate manager · Pacific Palisades · FastNet since 2024</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FinalCTA = ({ go }) => (
  <section className="relative overflow-hidden py-14 md:py-32 bg-ink-900 text-bone-100">
    <div className="absolute top-1/2 -right-[10%] -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
      style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 60%)' }}/>
    <div className="container-app relative">
      <div className="max-w-[800px]">
        <SectionTag number="06">Next</SectionTag>
        <h2 className="display-2 m-0">Let's see if FastNet is right for your address.</h2>
        <p className="body-lg text-ink-200 mt-6 max-w-[50ch]">
          Check 5G coverage in 30 seconds. If your signal qualifies, we'll schedule a survey.
          If it doesn't, we'll tell you — and we won't try to sell you anything.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-12">
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

const Footer = ({ go }) => (
  <footer className="bg-ink-900 text-ink-200 pt-16 pb-10 border-t border-white/[0.06]">
    <div className="container-app">
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-12 md:mb-16">
        <div className="col-span-2 md:col-span-1">
          <div className="text-bone-100"><Logo /></div>
          <p className="caption text-ink-300 mt-4 max-w-[32ch]">
            Managed 5G internet for homes, businesses, and the systems that run them.
            A service of a luxury AV & network integration practice based in Southern California.
          </p>
          <div className="flex items-center gap-2.5 mt-6">
            <span className="signal-dot" />
            <span className="mono-label text-signal">Network operational</span>
          </div>
        </div>
        {[
          { t: 'Service',     l: [['How it works','how'], ['Use cases','usecases'], ['Pricing','pricing'], ['Dashboard','dashboard']] },
          { t: 'Get started', l: [['Check availability','availability'], ['Schedule consult','consultation'], ['Order FastNet','pricing']] },
          { t: 'Company',     l: [['About the maker','about'], ['Integrators','#'], ['Press','#']] },
          { t: 'Support',     l: [['Status','#'], ['Docs','#'], ['Contact','#']] },
        ].map((col, i) => (
          <div key={i}>
            <div className="mono-label text-ink-300 mb-4">{col.t}</div>
            <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
              {col.l.map((it, j) => (
                <li key={j}>
                  <button onClick={() => it[1] !== '#' && go(it[1])}
                    className="text-bone-100 text-sm">{it[0]}</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-7 border-t border-white/[0.06] flex flex-col md:flex-row md:justify-between md:items-center gap-3.5 font-mono text-[11px] tracking-wide text-ink-400">
        <div>© 2026 FASTNET · A SERVICE OF MERIDIAN AV</div>
        <div className="flex flex-wrap gap-3.5 md:gap-8">
          <span>LOS ANGELES · ORANGE COUNTY · SAN DIEGO</span>
          <span>PRIVACY</span><span>TERMS</span><span>SLA</span>
        </div>
      </div>

      <div className="pt-5 mt-5 border-t border-white/[0.06] text-[12px] text-ink-300 leading-relaxed">
        Showcase project — designed &amp; built by{' '}
        <button onClick={() => go('about')} className="text-bone-100 underline underline-offset-4 hover:text-signal">
          Mahmoud Amr
        </button>
        , senior software engineer based in Cairo, freelancing since 2016. Available on{' '}
        <a href="https://www.upwork.com/freelancers/mahmouda299" target="_blank" rel="noopener noreferrer me"
           className="text-bone-100 underline underline-offset-4 hover:text-signal">Upwork</a>{' '}·{' '}
        <a href="https://www.linkedin.com/in/mahmoud-a-46818913b/" target="_blank" rel="noopener noreferrer me"
           className="text-bone-100 underline underline-offset-4 hover:text-signal">LinkedIn</a>{' '}·{' '}
        <a href="https://github.com/mahmoudamr512" target="_blank" rel="noopener noreferrer me"
           className="text-bone-100 underline underline-offset-4 hover:text-signal">GitHub</a>.
      </div>
    </div>
  </footer>
);

Object.assign(window, { FailoverExplainer, Principles, PullQuote, FinalCTA, Footer });
