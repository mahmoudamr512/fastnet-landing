// FastNet — Account dashboard preview

const Dashboard = ({ go }) => {
  const [liveLatency, setLiveLatency] = React.useState(18);
  const [primaryOnline, setPrimaryOnline] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => {
      setLiveLatency(14 + Math.round(Math.random() * 12));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ background: 'var(--ink-900)', color: 'var(--bone-100)', minHeight: 'calc(100vh - 64px)' }}>
      <div className="container" style={{ padding: '48px 32px' }}>
        <div data-dash-head style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
          <div>
            <div className="mono-label" style={{ color: 'var(--signal)' }}>Dashboard · preview</div>
            <h1 className="display-2" style={{ margin: '8px 0 0', fontSize: 48 }}>
              Pacific Palisades
            </h1>
            <div className="caption" style={{ color: 'var(--ink-300)', marginTop: 6 }}>
              Beacon G2 · BEA-2041-78 · Installed Jan 2026
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <StatusPill state="active" label="Primary · online"/>
            <StatusPill state={primaryOnline ? 'standby' : 'active'} label="Failover · standby"/>
            <button className="btn btn-sm btn-ghost" onClick={() => setPrimaryOnline(p => !p)}>
              Simulate outage
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, overflow: 'hidden', marginBottom: 32 }}>
          {[
            { l: 'Latency (now)', v: `${liveLatency} ms`, trend: '↓ 2ms' },
            { l: 'Downlink', v: '742 Mbps', trend: '↑ 30 day' },
            { l: 'Uptime · 30d', v: '99.997%', trend: '3 events' },
            { l: 'Data · month', v: '184 GB', trend: 'of ∞' },
          ].map((m, i) => (
            <div key={i} style={{ background: 'var(--ink-900)', padding: 28 }}>
              <div className="mono-label">{m.l}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, marginTop: 12, letterSpacing: '-0.02em' }}>
                {m.v}
              </div>
              <div className="mono-sm" style={{ color: 'var(--signal)', marginTop: 10 }}>{m.trend}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
          {/* Throughput chart */}
          <div style={{
            background: 'var(--ink-800)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: 28,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <div className="mono-label">Throughput · last 24 hours</div>
                <div style={{ fontSize: 20, fontWeight: 500, marginTop: 6 }}>Primary + FastNet 5G</div>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 2, background: 'var(--bone-100)' }}/> Primary
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 10, height: 2, background: 'var(--signal)' }}/> FastNet
                </span>
              </div>
            </div>

            <svg viewBox="0 0 700 220" style={{ width: '100%', height: 220 }}>
              {/* Grid */}
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="0" y1={i * 55} x2="700" y2={i * 55}
                  stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              ))}
              {/* Primary line */}
              <path d="M 0 80 Q 100 70, 160 90 T 300 60 T 440 100 T 580 75 T 700 90"
                stroke="rgba(244,241,236,0.8)" strokeWidth="1.5" fill="none"/>
              {/* Failover event spike */}
              <rect x="390" y="0" width="50" height="220" fill="rgba(205,235,90,0.06)"/>
              <line x1="415" y1="0" x2="415" y2="220" stroke="var(--signal)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
              <text x="415" y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9"
                letterSpacing="1" fill="var(--signal)">FAILOVER · 340ms</text>
              {/* FastNet line */}
              <path d="M 0 180 Q 100 185, 160 175 T 300 180 L 390 180 L 400 90 L 440 95 L 440 170 T 580 180 T 700 170"
                stroke="var(--signal)" strokeWidth="1.5" fill="none"/>
            </svg>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12,
              fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.05em', color: 'var(--ink-400)' }}>
              <span>24H AGO</span><span>18H</span><span>12H</span><span>6H</span><span>NOW</span>
            </div>
          </div>

          {/* Events */}
          <div style={{
            background: 'var(--ink-800)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 14, padding: 28,
          }}>
            <div className="mono-label" style={{ marginBottom: 16 }}>Recent events</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { t: '14:02', c: 'var(--signal)', l: 'Failover engaged', s: 'ISP latency spike · 340ms takeover' },
                { t: '14:02', c: 'var(--status-green)', l: 'ISP restored', s: 'Reverted to primary · seamless' },
                { t: '11:40', c: 'var(--ink-300)', l: 'Signal survey', s: 'Quarterly — all carriers nominal' },
                { t: 'Mon', c: 'var(--ink-300)', l: 'Firmware 2.4.1', s: 'Applied in maintenance window' },
                { t: 'Apr 8', c: 'var(--status-green)', l: 'Annual tune-up', s: 'On-site · antennas recalibrated' },
              ].map((e, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div className="mono-sm" style={{ color: 'var(--ink-400)', width: 50, flexShrink: 0, paddingTop: 4 }}>{e.t}</div>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: e.c,
                    marginTop: 8, flexShrink: 0 }}/>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{e.l}</div>
                    <div className="caption" style={{ color: 'var(--ink-300)', marginTop: 2 }}>{e.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginTop: 24 }}>
          {[
            {
              title: 'Plan', sub: 'FastNet Primary',
              body: ['$299 / month', '+$40 Private egress', '+$75 Wi-Fi 7 mesh'],
              foot: '$414 / month',
            },
            {
              title: 'Network', sub: 'Carrier-diverse',
              body: ['Static IP 38.124.4.91', 'Egress · LAX1', 'APN fn-private-01'],
              foot: '184 GB · 42 devices',
            },
            {
              title: 'Support', sub: 'Your engineer',
              body: ['Maya Trent — Senior NE', 'Direct: (424) 555-0199', 'On-call · 4hr response'],
              foot: 'Message Maya →',
            },
          ].map((c, i) => (
            <div key={i} style={{
              background: 'var(--ink-800)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 14, padding: 28,
            }}>
              <div className="mono-label">{c.title}</div>
              <div style={{ fontSize: 20, fontWeight: 500, marginTop: 6, marginBottom: 20 }}>{c.sub}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--ink-200)', fontSize: 14 }}>
                {c.body.map((b, j) => <div key={j}>{b}</div>)}
              </div>
              <div style={{ paddingTop: 16, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)',
                color: 'var(--signal)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em' }}>
                {c.foot}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.Dashboard = Dashboard;
