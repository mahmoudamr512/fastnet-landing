// FastNet — How it works deep dive page

const HOW_STEPS = [
  {
    n: '01', title: 'Site survey', sub: 'Before anything is ordered',
    body: 'A network engineer visits your property with spectrum-analysis gear. We measure actual signal from every carrier at every candidate mount point — not tower-locator guesses. You get a report; we get the right plan.',
    spec: [
      ['Carriers tested', '3 US nationwide + regional'],
      ['Bands evaluated', 'n41, n71, n77, n258, n260'],
      ['Deliverable', 'Heatmap + recommended plan'],
      ['Time on site', '45–90 min'],
    ],
  },
  {
    n: '02', title: 'The Beacon gateway', sub: 'Custom hardware, installed discreetly',
    body: 'Our Beacon G2 is a professional-grade 5G gateway with dual-SIM, dual-carrier redundancy, 2.5GbE out, and a mmWave+sub-6 antenna array. It lives in the utility closet, rack, or equipment room — never on your kitchen counter.',
    spec: [
      ['Peak throughput', '3.4 Gbps'],
      ['Radios', '5G NR mmWave + Sub-6, dual-SIM'],
      ['Handoff', '2.5GbE / SFP+ / Wi-Fi 7 optional'],
      ['Power', 'PoE+ or 12V'],
    ],
  },
  {
    n: '03', title: 'Carrier-diverse routing', sub: 'Two networks, one invisible handoff',
    body: 'The Beacon holds active sessions on two carriers simultaneously. If one sector degrades — congestion, weather, a truck hitting a tower — traffic switches over without dropping TCP connections.',
    spec: [
      ['Switchover time', '< 400ms typical'],
      ['Session continuity', 'Yes — MPTCP optional'],
      ['SLA target', '99.99% weekly'],
      ['Reroute events', 'Logged and reported'],
    ],
  },
  {
    n: '04', title: 'Private packet core', sub: 'Your traffic on our backbone',
    body: 'Every Beacon tunnels into our private APN. You get a static IP, no carrier-grade NAT, and the option to egress from LA, Phoenix, or Dallas. Makes VPN, security cameras, and smart-home integrations behave like they do on fiber.',
    spec: [
      ['IP allocation', 'Static IPv4 + IPv6 /64'],
      ['Egress PoPs', 'LAX · PHX · DFW'],
      ['Peering', 'Direct to AWS, GCP, Cloudflare'],
      ['CGNAT', 'Never'],
    ],
  },
  {
    n: '05', title: '24/7 monitoring', sub: 'We see it before you do',
    body: 'Every Beacon pings our NOC every 30 seconds with throughput, latency, signal quality, and failover state. Alerts go to our on-call engineer, not a ticket queue. If you call, you reach a human who already knows what happened.',
    spec: [
      ['Telemetry cadence', '30s'],
      ['On-call response', '< 5 min'],
      ['Truck rolls', 'Included'],
      ['Quarterly report', 'Full site health'],
    ],
  },
];

const HowItWorks = ({ go }) => (
  <div className="bg-bone-100 text-ink-900">
    <section className="pt-20 pb-16 md:pt-30 md:pb-20 bg-ink-900 text-bone-100">
      <div className="container-app">
        <SectionTag number="Technology">Under the hood</SectionTag>
        <h1 className="display-2 m-0 max-w-[18ch]">
          A connection isn't the hardware.<br/>
          <span className="italic text-signal">It's the operation around it.</span>
        </h1>
        <p className="body-lg text-ink-200 max-w-[54ch] mt-8">
          FastNet stacks five pieces: custom gateway hardware, carrier-diverse SIMs,
          a private packet core, continuous monitoring, and the engineers who run it.
          Here's how each part pulls its weight.
        </p>
      </div>
    </section>

    <section className="py-14 md:py-30">
      <div className="container-app">
        {HOW_STEPS.map((step, i) => (
          <Reveal key={i} delay={60}>
            <div className="grid md:grid-cols-[0.8fr_1.2fr_1fr] gap-8 md:gap-12 py-10 md:py-16 border-t border-ink-100 items-start">
              <div>
                <div className="mono-label text-[var(--color-signal-dim)] mb-3">STEP / {step.n}</div>
                <div className="display-2 text-[64px] md:text-[72px] leading-none text-ink-200">{step.n}</div>
              </div>
              <div>
                <h2 className="title m-0 text-[28px] md:text-[34px]">{step.title}</h2>
                <div className="mono-label mt-1.5 mb-5">{step.sub}</div>
                <p className="body-lg m-0 text-ink-500 max-w-[48ch]">{step.body}</p>
              </div>
              <div className="border border-ink-100 rounded-xl bg-bone-50">
                {step.spec.map((s, j) => (
                  <div key={j} className={cn(
                    'flex justify-between px-4.5 py-3.5',
                    j < step.spec.length - 1 && 'border-b border-ink-100'
                  )}>
                    <span className="mono-label">{s[0]}</span>
                    <span className="mono-sm text-ink-800">{s[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <FinalCTA go={go}/>
  </div>
);

window.HowItWorks = HowItWorks;
