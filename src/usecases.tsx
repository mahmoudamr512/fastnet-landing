import React from 'react';
import { SectionTag, Reveal, cn, type GoFn } from './primitives';
import { FinalCTA } from './sections';

type Category = 'residential' | 'business';
interface UseCase { tag: string; title: string; body: string; stats: [string, string][] }

const USE_CASES: Record<Category, UseCase[]> = {
  residential: [
    { tag: 'Primary',    title: 'Remote estates & new construction',
      body: 'Properties where fiber isn\'t scheduled to arrive for 12–36 months — or ever. FastNet Primary delivers the throughput a modern smart home expects.',
      stats: [['Download', '940 Mbps'], ['Upload', '120 Mbps'], ['Devices', '150+ supported']] },
    { tag: 'Failover',   title: 'Home offices & executive residences',
      body: 'When a missed video call is a real cost. FastNet sits beside your primary circuit, ready to take over before the screen even freezes.',
      stats: [['Switchover', '< 400ms'], ['Annual downtime', '< 52 min'], ['Zoom drops', '0']] },
    { tag: 'Integrated', title: 'Smart homes with Crestron, Savant, Lutron, Control4',
      body: 'Lighting scenes, climate, audio, cameras — all stop working the moment internet does. Keep them online with failover that integrates natively.',
      stats: [['Integrations', '40+'], ['Dashboard', 'Native'], ['Scenes preserved', 'Yes']] },
    { tag: 'Security',   title: 'Estate security & camera systems',
      body: 'Cellular backup the way it should work — automatic, high-bandwidth, no gap in recordings. Because "call the monitoring company" assumes you have signal.',
      stats: [['Camera streams', '64 concurrent'], ['Retention impact', '0%'], ['NVR compatible', 'All']] },
  ],
  business: [
    { tag: 'Primary',     title: 'Retail & hospitality — rapid deployment',
      body: 'New store, pop-up, restaurant, boutique. Permit-free installation. Open on day one, not week six.',
      stats: [['Install time', '2–4 hours'], ['POS latency', '< 35ms'], ['PCI compliant', 'Yes']] },
    { tag: 'Failover',    title: 'Financial & professional services',
      body: 'Trading windows don\'t wait. Law firms don\'t want to explain an outage to a judge. FastNet Failover keeps the lights on for the minutes that matter most.',
      stats: [['SLA', '99.99%'], ['Static IP', 'Included'], ['Audit logs', 'Included']] },
    { tag: 'Distributed', title: 'Multi-site operations',
      body: 'Deploy identical FastNet gateways across 10, 50, or 200 sites. Managed from one dashboard, billed on one invoice.',
      stats: [['Fleet dashboard', 'Yes'], ['Zero-touch deploy', 'Yes'], ['Unified SLA', 'Yes']] },
    { tag: 'Temporary',   title: 'Events, film production, construction',
      body: 'Month-to-month service for temporary sites. Bond it with cellular modems from other carriers for true broadcast-grade resilience.',
      stats: [['Min term', '30 days'], ['Bonding', 'Optional'], ['Truck install', 'Same day']] },
  ],
};

export const UseCases = ({ go }: { go: GoFn }) => {
  const [category, setCategory] = React.useState<Category>('residential');

  return (
    <div className="bg-bone-100 text-ink-900">
      <section className="pt-20 pb-10 md:pt-30 md:pb-15">
        <div className="container-app">
          <SectionTag number="Use cases">Where FastNet lives</SectionTag>
          <h1 className="display-2 m-0 max-w-[18ch]">
            Built for the places where <span className="italic">downtime</span> isn't an option.
          </h1>

          <div className="inline-flex gap-1 mt-12 p-1 bg-bone-200 rounded-full">
            {([{ k: 'residential', l: 'Residential' }, { k: 'business', l: 'Business' }] as const).map(t => (
              <button key={t.k} onClick={() => setCategory(t.k)} className={cn(
                'px-7 py-3 rounded-full text-[15px] font-medium transition-all',
                category === t.k ? 'bg-ink-900 text-bone-100' : 'bg-transparent text-ink-500'
              )}>
                {t.l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-10 pb-14 md:pb-30">
        <div className="container-app">
          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES[category].map((c, i) => (
              <Reveal key={`${category}-${i}`} delay={i * 40}>
                <div className="p-8 bg-bone-50 border border-ink-100 rounded-[18px] min-h-[340px] flex flex-col">
                  <div className="flex justify-between mb-8">
                    <div className="chip">{c.tag}</div>
                    <span className="w-2 h-2 rounded-full bg-signal"/>
                  </div>
                  <div className="placeholder h-35 mb-6 rounded-xl">{c.tag.toUpperCase()} · PHOTOGRAPHY</div>
                  <h3 className="title m-0 mb-3 text-[22px] md:text-[24px]">{c.title}</h3>
                  <p className="body text-ink-400 m-0 flex-grow">{c.body}</p>
                  <div className="flex flex-wrap gap-6 md:gap-8 mt-6 pt-5 border-t border-ink-100">
                    {c.stats.map((s, j) => (
                      <div key={j}>
                        <div className="mono-label">{s[0]}</div>
                        <div className="text-base font-medium mt-1">{s[1]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA go={go}/>
    </div>
  );
};

