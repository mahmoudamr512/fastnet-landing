// FastNet — Use cases page

const UseCases = ({ go }) => {
  const [category, setCategory] = React.useState('residential');

  const cases = {
    residential: [
      {
        tag: 'Primary',
        title: 'Remote estates & new construction',
        body: 'Properties where fiber isn\'t scheduled to arrive for 12–36 months — or ever. FastNet Primary delivers the throughput a modern smart home expects.',
        stats: [['Download', '940 Mbps'], ['Upload', '120 Mbps'], ['Devices', '150+ supported']],
      },
      {
        tag: 'Failover',
        title: 'Home offices & executive residences',
        body: 'When a missed video call is a real cost. FastNet sits beside your primary circuit, ready to take over before the screen even freezes.',
        stats: [['Switchover', '< 400ms'], ['Annual downtime', '< 52 min'], ['Zoom drops', '0']],
      },
      {
        tag: 'Integrated',
        title: 'Smart homes with Crestron, Savant, Lutron, Control4',
        body: 'Lighting scenes, climate, audio, cameras — all stop working the moment internet does. Keep them online with failover that integrates natively.',
        stats: [['Integrations', '40+'], ['Dashboard', 'Native'], ['Scenes preserved', 'Yes']],
      },
      {
        tag: 'Security',
        title: 'Estate security & camera systems',
        body: 'Cellular backup the way it should work — automatic, high-bandwidth, no gap in recordings. Because "call the monitoring company" assumes you have signal.',
        stats: [['Camera streams', '64 concurrent'], ['Retention impact', '0%'], ['NVR compatible', 'All']],
      },
    ],
    business: [
      {
        tag: 'Primary',
        title: 'Retail & hospitality — rapid deployment',
        body: 'New store, pop-up, restaurant, boutique. Permit-free installation. Open on day one, not week six.',
        stats: [['Install time', '2–4 hours'], ['POS latency', '< 35ms'], ['PCI compliant', 'Yes']],
      },
      {
        tag: 'Failover',
        title: 'Financial & professional services',
        body: 'Trading windows don\'t wait. Law firms don\'t want to explain an outage to a judge. FastNet Failover keeps the lights on for the minutes that matter most.',
        stats: [['SLA', '99.99%'], ['Static IP', 'Included'], ['Audit logs', 'Included']],
      },
      {
        tag: 'Distributed',
        title: 'Multi-site operations',
        body: 'Deploy identical FastNet gateways across 10, 50, or 200 sites. Managed from one dashboard, billed on one invoice.',
        stats: [['Fleet dashboard', 'Yes'], ['Zero-touch deploy', 'Yes'], ['Unified SLA', 'Yes']],
      },
      {
        tag: 'Temporary',
        title: 'Events, film production, construction',
        body: 'Month-to-month service for temporary sites. Bond it with cellular modems from other carriers for true broadcast-grade resilience.',
        stats: [['Min term', '30 days'], ['Bonding', 'Optional'], ['Truck install', 'Same day']],
      },
    ],
  };

  return (
    <div style={{ background: 'var(--bone-100)', color: 'var(--ink-900)' }}>
      <section style={{ padding: '120px 0 60px' }}>
        <div className="container">
          <SectionTag number="Use cases">Where FastNet lives</SectionTag>
          <h1 className="display-2" style={{ margin: 0, maxWidth: '18ch' }}>
            Built for the places where <span style={{ fontStyle: 'italic' }}>downtime</span> isn't an option.
          </h1>

          <div style={{
            display: 'flex', gap: 4, marginTop: 56, padding: 4,
            background: 'var(--bone-200)', borderRadius: 999, width: 'fit-content',
          }}>
            {[
              { k: 'residential', l: 'Residential' },
              { k: 'business', l: 'Business' },
            ].map(t => (
              <button key={t.k} onClick={() => setCategory(t.k)}
                style={{
                  padding: '12px 28px', borderRadius: 999, fontSize: 15, fontWeight: 500,
                  background: category === t.k ? 'var(--ink-900)' : 'transparent',
                  color: category === t.k ? 'var(--bone-100)' : 'var(--ink-500)',
                  transition: 'all .2s ease',
                }}>
                {t.l}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 0 120px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {cases[category].map((c, i) => (
              <Reveal key={`${category}-${i}`} delay={i * 40}>
                <div style={{
                  padding: 32,
                  background: 'var(--bone-50)',
                  border: '1px solid var(--ink-100)',
                  borderRadius: 18,
                  minHeight: 340,
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                    <div className="chip">{c.tag}</div>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)' }}/>
                  </div>

                  {/* placeholder image */}
                  <div className="placeholder" style={{ height: 140, marginBottom: 24, borderRadius: 12 }}>
                    {c.tag.toUpperCase()} · PHOTOGRAPHY
                  </div>

                  <h3 className="title" style={{ margin: 0, marginBottom: 12, fontSize: 24 }}>
                    {c.title}
                  </h3>
                  <p className="body" style={{ color: 'var(--ink-400)', margin: 0, flexGrow: 1 }}>
                    {c.body}
                  </p>

                  <div style={{ display: 'flex', gap: 32, marginTop: 24, paddingTop: 20,
                    borderTop: '1px solid var(--ink-100)' }}>
                    {c.stats.map((s, j) => (
                      <div key={j}>
                        <div className="mono-label">{s[0]}</div>
                        <div style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>{s[1]}</div>
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

window.UseCases = UseCases;
