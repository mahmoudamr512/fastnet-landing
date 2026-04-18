// FastNet — How it works deep dive page

const HowItWorks = ({ go }) => {
  return (
    <div style={{ background: 'var(--bone-100)', color: 'var(--ink-900)' }}>
      {/* Hero */}
      <section style={{ padding: '120px 0 80px', background: 'var(--ink-900)', color: 'var(--bone-100)' }}>
        <div className="container">
          <SectionTag number="Technology">Under the hood</SectionTag>
          <h1 className="display-2" style={{ margin: 0, maxWidth: '18ch' }}>
            A connection isn't the hardware.
            <br/>
            <span style={{ fontStyle: 'italic', color: 'var(--signal)' }}>It's the operation around it.</span>
          </h1>
          <p className="body-lg" style={{ color: 'var(--ink-200)', maxWidth: '54ch', marginTop: 32 }}>
            FastNet stacks five pieces: custom gateway hardware, carrier-diverse SIMs,
            a private packet core, continuous monitoring, and the engineers who run it.
            Here's how each part pulls its weight.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          {[
            {
              n: '01',
              title: 'Site survey',
              sub: 'Before anything is ordered',
              body: 'A network engineer visits your property with spectrum-analysis gear. We measure actual signal from every carrier at every candidate mount point — not tower-locator guesses. You get a report; we get the right plan.',
              spec: [
                ['Carriers tested', '3 US nationwide + regional'],
                ['Bands evaluated', 'n41, n71, n77, n258, n260'],
                ['Deliverable', 'Heatmap + recommended plan'],
                ['Time on site', '45–90 min'],
              ],
            },
            {
              n: '02',
              title: 'The Beacon gateway',
              sub: 'Custom hardware, installed discreetly',
              body: 'Our Beacon G2 is a professional-grade 5G gateway with dual-SIM, dual-carrier redundancy, 2.5GbE out, and a mmWave+sub-6 antenna array. It lives in the utility closet, rack, or equipment room — never on your kitchen counter.',
              spec: [
                ['Peak throughput', '3.4 Gbps'],
                ['Radios', '5G NR mmWave + Sub-6, dual-SIM'],
                ['Handoff', '2.5GbE / SFP+ / Wi-Fi 7 optional'],
                ['Power', 'PoE+ or 12V'],
              ],
            },
            {
              n: '03',
              title: 'Carrier-diverse routing',
              sub: 'Two networks, one invisible handoff',
              body: 'The Beacon holds active sessions on two carriers simultaneously. If one sector degrades — congestion, weather, a truck hitting a tower — traffic switches over without dropping TCP connections.',
              spec: [
                ['Switchover time', '< 400ms typical'],
                ['Session continuity', 'Yes — MPTCP optional'],
                ['SLA target', '99.99% weekly'],
                ['Reroute events', 'Logged and reported'],
              ],
            },
            {
              n: '04',
              title: 'Private packet core',
              sub: 'Your traffic on our backbone',
              body: 'Every Beacon tunnels into our private APN. You get a static IP, no carrier-grade NAT, and the option to egress from LA, Phoenix, or Dallas. Makes VPN, security cameras, and smart-home integrations behave like they do on fiber.',
              spec: [
                ['IP allocation', 'Static IPv4 + IPv6 /64'],
                ['Egress PoPs', 'LAX · PHX · DFW'],
                ['Peering', 'Direct to AWS, GCP, Cloudflare'],
                ['CGNAT', 'Never'],
              ],
            },
            {
              n: '05',
              title: '24/7 monitoring',
              sub: 'We see it before you do',
              body: 'Every Beacon pings our NOC every 30 seconds with throughput, latency, signal quality, and failover state. Alerts go to our on-call engineer, not a ticket queue. If you call, you reach a human who already knows what happened.',
              spec: [
                ['Telemetry cadence', '30s'],
                ['On-call response', '< 5 min'],
                ['Truck rolls', 'Included'],
                ['Quarterly report', 'Full site health'],
              ],
            },
          ].map((step, i) => (
            <Reveal key={i} delay={60}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '0.8fr 1.2fr 1fr',
                gap: 48,
                padding: '64px 0',
                borderTop: '1px solid var(--ink-100)',
                alignItems: 'start',
              }}>
                <div>
                  <div className="mono-label" style={{ color: 'var(--signal-dim)', marginBottom: 12 }}>
                    STEP / {step.n}
                  </div>
                  <div className="display-2" style={{ fontSize: 72, lineHeight: 1, color: 'var(--ink-200)' }}>
                    {step.n}
                  </div>
                </div>
                <div>
                  <h2 className="title" style={{ margin: 0, fontSize: 34 }}>{step.title}</h2>
                  <div className="mono-label" style={{ marginTop: 6, marginBottom: 20 }}>{step.sub}</div>
                  <p className="body-lg" style={{ margin: 0, color: 'var(--ink-500)', maxWidth: '48ch' }}>
                    {step.body}
                  </p>
                </div>
                <div style={{ border: '1px solid var(--ink-100)', borderRadius: 12, background: 'var(--bone-50)' }}>
                  {step.spec.map((s, j) => (
                    <div key={j} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '14px 18px',
                      borderBottom: j < step.spec.length - 1 ? '1px solid var(--ink-100)' : 'none',
                    }}>
                      <span className="mono-label">{s[0]}</span>
                      <span className="mono-sm" style={{ color: 'var(--ink-800)' }}>{s[1]}</span>
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
};

window.HowItWorks = HowItWorks;
