// FastNet — Pricing page

const PLANS = [
  {
    id: 'failover', name: 'FastNet Failover', price: 149,
    tagline: 'Keep your fiber. Add the safety net.',
    description: 'Sits alongside your primary ISP. Engages in under 400ms when it drops. You never notice.',
    included: [
      'Beacon G2 gateway (installed)',
      'Dual-carrier 5G redundancy',
      'Automatic sub-second failover',
      '500 GB / month carry capacity',
      '99.99% uptime SLA',
      '24/7 network operations center',
      'Quarterly health report',
    ],
    cta: 'Choose Failover', recommended: false,
  },
  {
    id: 'primary', name: 'FastNet Primary', price: 299,
    tagline: 'Your only connection — engineered like it.',
    description: 'Full-service managed 5G internet. For properties without fiber, or where fiber isn\'t enough.',
    included: [
      'Beacon G2 gateway (installed)',
      'Dual-carrier 5G — unlimited',
      'Static IPv4 + IPv6 /64',
      'Private APN & backbone routing',
      '99.99% uptime SLA',
      '24/7 network operations center',
      'Wi-Fi 7 mesh integration',
      'On-site response within 4 hours',
      'Quarterly on-site tune-up',
    ],
    cta: 'Choose Primary', recommended: true,
  },
];

const ADDONS = [
  { n: 'Static IP block',    p: '$25 / mo',  d: 'Block of 5 public IPv4 addresses' },
  { n: 'Private egress',     p: '$40 / mo',  d: 'Dedicated egress from LAX, PHX, or DFW' },
  { n: 'Wi-Fi 7 mesh',       p: '$75 / mo',  d: 'Professionally designed coverage — up to 5 APs' },
  { n: 'Extra carrier SIM',  p: '$30 / mo',  d: 'Third carrier for ultra-resilient sites' },
  { n: 'Expedited install',  p: '$250 once', d: 'Same-week scheduling, priority queue' },
  { n: 'Annual on-site',     p: '$450 / yr', d: 'Yearly signal re-survey and tuning' },
];

const FAQ = [
  ['Is this a contract?', 'No. FastNet is month-to-month. Cancel any time with 30 days notice. Hardware is ours — we remove it.'],
  ['What if 5G isn\'t strong enough?', 'Our site survey confirms signal before we quote. If your site doesn\'t qualify, we\'ll say so — and recommend alternatives.'],
  ['Can I use my own router?', 'Yes. The Beacon hands off clean IP to any firewall, router, or mesh. We also partner with Ubiquiti, Firewalla, and Meraki.'],
  ['Will it work in a blackout?', 'The Beacon runs on PoE+ and can be UPS-powered. A 1kWh UPS gives you roughly 8 hours of internet without utility power.'],
];

const PlanCard = ({ plan, onChoose }) => (
  <div className={cn(
    'p-8 md:p-10 rounded-[22px] flex flex-col relative border',
    plan.recommended
      ? 'bg-ink-900 text-bone-100 border-ink-900'
      : 'bg-bone-50 text-ink-900 border-ink-100'
  )}>
    {plan.recommended && (
      <div className="absolute -top-3 right-8 px-3.5 py-1.5 rounded-full bg-signal text-ink-900 font-mono text-[10px] tracking-wider uppercase font-semibold">
        Most chosen
      </div>
    )}

    <div className="flex justify-between items-start">
      <div>
        <h2 className="font-sans font-medium text-[28px] tracking-tight m-0">{plan.name}</h2>
        <div className={cn('mono-label mt-2.5', plan.recommended ? 'text-signal' : 'text-[var(--color-signal-dim)]')}>
          {plan.tagline}
        </div>
      </div>
      <span className="w-2.5 h-2.5 rounded-full bg-signal"
        style={{ boxShadow: plan.recommended ? '0 0 12px var(--color-signal)' : 'none' }}/>
    </div>

    <div className="flex items-baseline gap-2.5 mt-12">
      <span className="font-display text-[64px] md:text-[96px] leading-none tracking-tight">${plan.price}</span>
      <span className={cn('mono-sm', plan.recommended ? 'text-ink-300' : 'text-ink-400')}>/ month</span>
    </div>

    <p className={cn('body mt-3 mb-8 max-w-[40ch]', plan.recommended ? 'text-ink-200' : 'text-ink-400')}>
      {plan.description}
    </p>

    <div className={cn('h-px mb-6', plan.recommended ? 'bg-white/10' : 'bg-ink-100')}/>

    <ul className="list-none p-0 m-0 flex flex-col gap-3 flex-grow">
      {plan.included.map((inc, i) => (
        <li key={i} className="flex gap-3 text-sm">
          <svg width="14" height="14" viewBox="0 0 14 14" className="shrink-0 mt-1">
            <path d="M2 7 L6 11 L12 3" stroke={plan.recommended ? 'var(--color-signal)' : 'var(--color-ink-900)'}
              strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{inc}</span>
        </li>
      ))}
    </ul>

    <button onClick={() => onChoose(plan.id)} className={cn(
      'btn btn-lg mt-10 w-full text-ink-900',
      plan.recommended ? 'bg-signal' : 'bg-ink-900 !text-bone-100'
    )}>
      {plan.cta} <Arrow size={14}/>
    </button>

    <div className="mono-sm mt-4 text-center text-ink-400">No contract · 30-day satisfaction</div>
  </div>
);

const Pricing = ({ go, startCheckout }) => (
  <div className="bg-bone-100 text-ink-900">
    <section className="pt-20 pb-10 md:pt-30 md:pb-15">
      <div className="container-app">
        <SectionTag number="Pricing">Two plans. No overages.</SectionTag>
        <h1 className="display-2 m-0 max-w-[16ch]">Flat monthly rate. The one you see is the one you pay.</h1>
        <p className="body-lg text-ink-500 max-w-[48ch] mt-6">
          Installation and hardware are included. Cancel any time — including the day your fiber finally arrives.
        </p>
      </div>
    </section>

    <section className="pt-10 pb-14 md:pb-20">
      <div className="container-app">
        <div className="grid md:grid-cols-2 gap-6">
          {PLANS.map(plan => <PlanCard key={plan.id} plan={plan} onChoose={startCheckout}/>)}
        </div>

        <div className="mt-16 md:mt-20">
          <SectionTag number="Add-ons">Optional</SectionTag>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-100 border border-ink-100">
            {ADDONS.map((a, i) => (
              <div key={i} className="p-7 bg-bone-50">
                <div className="flex justify-between mb-2">
                  <span className="text-base font-medium">{a.n}</span>
                  <span className="mono-sm text-ink-800">{a.p}</span>
                </div>
                <p className="caption m-0">{a.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-30">
          <SectionTag number="FAQ">Common questions</SectionTag>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {FAQ.map(([q, a], i) => (
              <div key={i} className="py-6 border-t border-ink-100">
                <h4 className="text-[18px] font-medium m-0 mb-2">{q}</h4>
                <p className="body text-ink-400 m-0">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <FinalCTA go={go}/>
  </div>
);

Object.assign(window, { Pricing, PLANS });
