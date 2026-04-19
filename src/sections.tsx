import React from 'react';
import { Logo, Arrow, SectionTag, Reveal, cn, type GoFn } from './primitives';
import { FailoverDiagramSVG } from './svg/FailoverDiagramSVG';

type Mode = 'failover' | 'primary';

export const FailoverExplainer = ({ go }: { go: GoFn }) => {
  const [mode, setMode] = React.useState<Mode>('failover');

  return (
    <section className="py-14 md:py-32 bg-bone-100 text-ink-900">
      <div className="container-app">
        <SectionTag number="02">Two deployments, one network</SectionTag>

        <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-start">
          <div>
            <h2 className="headline m-0 max-w-[14ch]">Failover or primary. The difference is everything.</h2>

            <div className="inline-flex gap-1 mt-12 p-1 bg-bone-200 rounded-full">
              {([{ k: 'failover', l: 'Failover' }, { k: 'primary', l: 'Primary' }] as const).map(t => (
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

const FailoverDiagram = ({ mode }: { mode: Mode }) => {
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
        <FailoverDiagramSVG mode={mode} primaryActive={primaryActive} fastnetActive={fastnetActive} simulateOutage={simulateOutage} switchMs={switchMs} />
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

export const Principles = () => {
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

export const PullQuote = () => (
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

export const FinalCTA = ({ go }: { go: GoFn }) => (
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

export const Footer = ({ go }: { go: GoFn }) => (
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

