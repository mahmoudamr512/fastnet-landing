// FastNet — Pricing page

const PLANS = [
  {
    id: 'failover',
    name: 'FastNet Failover',
    price: 149,
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
    cta: 'Choose Failover',
    recommended: false,
  },
  {
    id: 'primary',
    name: 'FastNet Primary',
    price: 299,
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
    cta: 'Choose Primary',
    recommended: true,
  },
];

const Pricing = ({ go, startCheckout }) => {
  return (
    <div style={{ background: 'var(--bone-100)', color: 'var(--ink-900)' }}>
      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <SectionTag number="Pricing">Two plans. No overages.</SectionTag>
          <h1 className="display-2" style={{ margin: 0, maxWidth: '16ch' }}>
            Flat monthly rate. The one you see is the one you pay.
          </h1>
          <p className="body-lg" style={{ color: 'var(--ink-500)', maxWidth: '48ch', marginTop: 24 }}>
            Installation and hardware are included. Cancel any time — including the day your fiber finally arrives.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {PLANS.map(plan => (
              <div key={plan.id} style={{
                padding: 40,
                background: plan.recommended ? 'var(--ink-900)' : 'var(--bone-50)',
                color: plan.recommended ? 'var(--bone-100)' : 'var(--ink-900)',
                border: `1px solid ${plan.recommended ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                borderRadius: 22,
                display: 'flex', flexDirection: 'column',
                position: 'relative',
              }}>
                {plan.recommended && (
                  <div style={{
                    position: 'absolute', top: -12, right: 32,
                    padding: '6px 14px', borderRadius: 999,
                    background: 'var(--signal)', color: 'var(--ink-900)',
                    fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em',
                    textTransform: 'uppercase', fontWeight: 600,
                  }}>
                    Most chosen
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{
                      fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 28, letterSpacing: '-0.015em',
                      margin: 0,
                    }}>
                      {plan.name}
                    </h2>
                    <div className="mono-label" style={{
                      color: plan.recommended ? 'var(--signal)' : 'var(--signal-dim)',
                      marginTop: 10
                    }}>
                      {plan.tagline}
                    </div>
                  </div>
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: 'var(--signal)',
                    boxShadow: plan.recommended ? '0 0 12px var(--signal)' : 'none',
                  }}/>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 48 }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 400,
                    fontSize: 96, lineHeight: 1, letterSpacing: '-0.03em',
                  }}>
                    ${plan.price}
                  </span>
                  <span className="mono-sm" style={{
                    color: plan.recommended ? 'var(--ink-300)' : 'var(--ink-400)',
                  }}>
                    / month
                  </span>
                </div>

                <p className="body" style={{
                  color: plan.recommended ? 'var(--ink-200)' : 'var(--ink-400)',
                  marginTop: 12, marginBottom: 32,
                  maxWidth: '40ch',
                }}>
                  {plan.description}
                </p>

                <div style={{
                  height: 1,
                  background: plan.recommended ? 'rgba(255,255,255,0.1)' : 'var(--ink-100)',
                  marginBottom: 24,
                }}/>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0,
                  display: 'flex', flexDirection: 'column', gap: 12, flexGrow: 1 }}>
                  {plan.included.map((inc, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, fontSize: 14 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" style={{ flexShrink: 0, marginTop: 4 }}>
                        <path d="M2 7 L6 11 L12 3" stroke={plan.recommended ? 'var(--signal)' : 'var(--ink-900)'}
                          strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => startCheckout(plan.id)}
                  className="btn btn-lg"
                  style={{
                    marginTop: 40,
                    background: plan.recommended ? 'var(--signal)' : 'var(--ink-900)',
                    color: 'var(--ink-900)',
                    width: '100%',
                  }}>
                  {plan.cta} <Arrow size={14}/>
                </button>

                <div className="mono-sm" style={{
                  marginTop: 16, textAlign: 'center',
                  color: plan.recommended ? 'var(--ink-400)' : 'var(--ink-400)',
                }}>
                  No contract · 30-day satisfaction
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div style={{ marginTop: 80 }}>
            <SectionTag number="Add-ons">Optional</SectionTag>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1,
              background: 'var(--ink-100)',
              border: '1px solid var(--ink-100)',
            }}>
              {[
                { n: 'Static IP block', p: '$25 / mo', d: 'Block of 5 public IPv4 addresses' },
                { n: 'Private egress', p: '$40 / mo', d: 'Dedicated egress from LAX, PHX, or DFW' },
                { n: 'Wi-Fi 7 mesh', p: '$75 / mo', d: 'Professionally designed coverage — up to 5 APs' },
                { n: 'Extra carrier SIM', p: '$30 / mo', d: 'Third carrier for ultra-resilient sites' },
                { n: 'Expedited install', p: '$250 once', d: 'Same-week scheduling, priority queue' },
                { n: 'Annual on-site', p: '$450 / yr', d: 'Yearly signal re-survey and tuning' },
              ].map((a, i) => (
                <div key={i} style={{ padding: 28, background: 'var(--bone-50)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 500 }}>{a.n}</span>
                    <span className="mono-sm" style={{ color: 'var(--ink-800)' }}>{a.p}</span>
                  </div>
                  <p className="caption" style={{ margin: 0 }}>{a.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: 120 }}>
            <SectionTag number="FAQ">Common questions</SectionTag>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              {[
                ['Is this a contract?', 'No. FastNet is month-to-month. Cancel any time with 30 days notice. Hardware is ours — we remove it.'],
                ['What if 5G isn\'t strong enough?', 'Our site survey confirms signal before we quote. If your site doesn\'t qualify, we\'ll say so — and recommend alternatives.'],
                ['Can I use my own router?', 'Yes. The Beacon hands off clean IP to any firewall, router, or mesh. We also partner with Ubiquiti, Firewalla, and Meraki.'],
                ['Will it work in a blackout?', 'The Beacon runs on PoE+ and can be UPS-powered. A 1kWh UPS gives you roughly 8 hours of internet without utility power.'],
              ].map(([q, a], i) => (
                <div key={i} style={{ padding: '24px 0', borderTop: '1px solid var(--ink-100)' }}>
                  <h4 style={{ fontSize: 18, fontWeight: 500, margin: 0, marginBottom: 8 }}>{q}</h4>
                  <p className="body" style={{ color: 'var(--ink-400)', margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FinalCTA go={go}/>
    </div>
  );
};

Object.assign(window, { Pricing, PLANS });
