// FastNet — Account dashboard preview

const Dashboard = ({ go }) => {
  const [liveLatency, setLiveLatency] = React.useState(18);
  const [primaryOnline, setPrimaryOnline] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => setLiveLatency(14 + Math.round(Math.random() * 12)), 1500);
    return () => clearInterval(id);
  }, []);

  const kpis = [
    { l: 'Latency (now)', v: `${liveLatency} ms`, trend: '↓ 2ms' },
    { l: 'Downlink',      v: '742 Mbps',          trend: '↑ 30 day' },
    { l: 'Uptime · 30d',  v: '99.997%',           trend: '3 events' },
    { l: 'Data · month',  v: '184 GB',            trend: 'of ∞' },
  ];

  const events = [
    { t: '14:02', c: 'var(--color-signal)',       l: 'Failover engaged', s: 'ISP latency spike · 340ms takeover' },
    { t: '14:02', c: 'var(--color-status-green)', l: 'ISP restored',     s: 'Reverted to primary · seamless' },
    { t: '11:40', c: 'var(--color-ink-300)',      l: 'Signal survey',    s: 'Quarterly — all carriers nominal' },
    { t: 'Mon',   c: 'var(--color-ink-300)',      l: 'Firmware 2.4.1',   s: 'Applied in maintenance window' },
    { t: 'Apr 8', c: 'var(--color-status-green)', l: 'Annual tune-up',   s: 'On-site · antennas recalibrated' },
  ];

  const summary = [
    { title: 'Plan',    sub: 'FastNet Primary',   body: ['$299 / month', '+$40 Private egress', '+$75 Wi-Fi 7 mesh'], foot: '$414 / month' },
    { title: 'Network', sub: 'Carrier-diverse',   body: ['Static IP 38.124.4.91', 'Egress · LAX1', 'APN fn-private-01'], foot: '184 GB · 42 devices' },
    { title: 'Support', sub: 'Your engineer',     body: ['Maya Trent — Senior NE', 'Direct: (424) 555-0199', 'On-call · 4hr response'], foot: 'Message Maya →' },
  ];

  return (
    <div className="bg-ink-900 text-bone-100 min-h-[calc(100vh-64px)]">
      <div className="container-app py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
          <div>
            <div className="mono-label text-signal">Dashboard · preview</div>
            <h1 className="display-2 mt-2 text-[36px] md:text-[48px]">Pacific Palisades</h1>
            <div className="caption text-ink-300 mt-1.5">Beacon G2 · BEA-2041-78 · Installed Jan 2026</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <StatusPill state="active" label="Primary · online"/>
            <StatusPill state={primaryOnline ? 'standby' : 'active'} label="Failover · standby"/>
            <button className="btn btn-sm btn-ghost" onClick={() => setPrimaryOnline(p => !p)}>Simulate outage</button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] rounded-[14px] overflow-hidden mb-8">
          {kpis.map((m, i) => (
            <div key={i} className="bg-ink-900 p-5 md:p-7">
              <div className="mono-label">{m.l}</div>
              <div className="font-display text-[32px] md:text-[48px] leading-none mt-3 tracking-tight">{m.v}</div>
              <div className="mono-sm text-signal mt-2.5">{m.trend}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-6">
          <div className="bg-ink-800 border border-white/[0.06] rounded-[14px] p-7">
            <div className="flex flex-wrap justify-between gap-3 mb-6">
              <div>
                <div className="mono-label">Throughput · last 24 hours</div>
                <div className="text-xl font-medium mt-1.5">Primary + FastNet 5G</div>
              </div>
              <div className="flex gap-4 text-xs items-center">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-px bg-bone-100"/> Primary</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-px bg-signal"/> FastNet</span>
              </div>
            </div>
            <svg viewBox="0 0 700 220" className="w-full h-[220px]">
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="0" y1={i * 55} x2="700" y2={i * 55} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              ))}
              <path d="M 0 80 Q 100 70, 160 90 T 300 60 T 440 100 T 580 75 T 700 90" stroke="rgba(244,241,236,0.8)" strokeWidth="1.5" fill="none"/>
              <rect x="390" y="0" width="50" height="220" fill="rgba(205,235,90,0.06)"/>
              <line x1="415" y1="0" x2="415" y2="220" stroke="var(--color-signal)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
              <text x="415" y="18" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1" fill="var(--color-signal)">FAILOVER · 340ms</text>
              <path d="M 0 180 Q 100 185, 160 175 T 300 180 L 390 180 L 400 90 L 440 95 L 440 170 T 580 180 T 700 170" stroke="var(--color-signal)" strokeWidth="1.5" fill="none"/>
            </svg>
            <div className="flex justify-between mt-3 font-mono text-[10px] tracking-wider text-ink-400">
              <span>24H AGO</span><span>18H</span><span>12H</span><span>6H</span><span>NOW</span>
            </div>
          </div>

          <div className="bg-ink-800 border border-white/[0.06] rounded-[14px] p-7">
            <div className="mono-label mb-4">Recent events</div>
            <div className="flex flex-col gap-3.5">
              {events.map((e, i) => (
                <div key={i} className="flex gap-3.5 items-start">
                  <div className="mono-sm text-ink-400 w-12 shrink-0 pt-1">{e.t}</div>
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: e.c }}/>
                  <div>
                    <div className="text-sm font-medium">{e.l}</div>
                    <div className="caption text-ink-300 mt-0.5">{e.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {summary.map((c, i) => (
            <div key={i} className="bg-ink-800 border border-white/[0.06] rounded-[14px] p-7">
              <div className="mono-label">{c.title}</div>
              <div className="text-xl font-medium mt-1.5 mb-5">{c.sub}</div>
              <div className="flex flex-col gap-2 text-ink-200 text-sm">
                {c.body.map((b, j) => <div key={j}>{b}</div>)}
              </div>
              <div className="pt-4 mt-4 border-t border-white/[0.06] text-signal font-mono text-[11px] tracking-wider">
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
