// FastNet — Availability check

const Availability = ({ go }) => {
  const [zip, setZip] = React.useState('');
  const [checking, setChecking] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const check = () => {
    if (zip.length < 5) return;
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      // Deterministic "result" based on zip hash
      const sum = zip.split('').reduce((a, c) => a + parseInt(c) || 0, 0);
      const verdict = sum % 4 === 0 ? 'marginal' : 'qualified';
      setResult({
        verdict,
        carriers: [
          { name: 'Primary 5G', signal: verdict === 'qualified' ? -68 : -92, bands: 'n41 · n77' },
          { name: 'Secondary 5G', signal: verdict === 'qualified' ? -75 : -96, bands: 'n71 · n258' },
          { name: 'Regional', signal: -84, bands: 'n77' },
        ],
        peakMbps: verdict === 'qualified' ? 940 : 420,
      });
      setChecking(false);
    }, 1400);
  };

  return (
    <div style={{ background: 'var(--ink-900)', color: 'var(--bone-100)', minHeight: 'calc(100vh - 64px)' }}>
      <section style={{ padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 900, height: 900,
          background: 'radial-gradient(circle, var(--signal-soft) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}/>
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <SectionTag number="Coverage">30-second check</SectionTag>
          <h1 className="display-2" style={{ margin: '0 auto', maxWidth: '18ch' }}>
            Is your address <span style={{ fontStyle: 'italic', color: 'var(--signal)' }}>FastNet-ready?</span>
          </h1>
          <p className="body-lg" style={{ color: 'var(--ink-200)', maxWidth: '46ch', margin: '24px auto 48px' }}>
            Enter your ZIP. We query live tower data and return a signal verdict in under a minute.
          </p>

          <div style={{
            display: 'flex', gap: 10, maxWidth: 520, margin: '0 auto',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 999, padding: 8,
          }}>
            <input
              placeholder="90210"
              maxLength={5}
              value={zip}
              onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
              onKeyDown={e => e.key === 'Enter' && check()}
              style={{
                flexGrow: 1, background: 'transparent', border: 'none',
                padding: '0 20px', fontSize: 18, color: 'var(--bone-100)',
                fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
              }}
            />
            <button onClick={check} disabled={checking || zip.length < 5}
              className="btn btn-signal"
              style={{ opacity: zip.length < 5 ? 0.5 : 1 }}>
              {checking ? 'Checking…' : 'Check signal'} <Arrow size={12}/>
            </button>
          </div>

          {checking && (
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 8 }}>
              {[0,1,2].map(i => (
                <span key={i} style={{
                  width: 8, height: 8, borderRadius: '50%', background: 'var(--signal)',
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}/>
              ))}
            </div>
          )}

          {result && (
            <div style={{
              maxWidth: 680, margin: '56px auto 0',
              background: 'var(--ink-800)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18,
              padding: 32,
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="mono-label" style={{ color: 'var(--signal)' }}>ZIP {zip}</div>
                  <div style={{
                    fontSize: 28, fontWeight: 500, marginTop: 6,
                    color: result.verdict === 'qualified' ? 'var(--signal)' : 'var(--status-amber)',
                  }}>
                    {result.verdict === 'qualified' ? 'Qualified for FastNet' : 'Marginal — survey recommended'}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono-label">Est. peak</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, lineHeight: 1, marginTop: 4 }}>
                    {result.peakMbps} <span style={{ fontSize: 18 }}>Mbps</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {result.carriers.map((c, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: i < result.carriers.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{c.name}</div>
                      <div className="mono-sm" style={{ color: 'var(--ink-400)' }}>{c.bands}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <SignalIcon strength={c.signal > -80 ? 4 : c.signal > -90 ? 3 : 2}/>
                      <span className="mono-sm" style={{ color: 'var(--ink-200)', width: 70, textAlign: 'right' }}>{c.signal} dBm</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
                <button className="btn btn-signal" onClick={() => go('pricing')} style={{ flex: 1 }}>
                  Continue to plans <Arrow size={12}/>
                </button>
                <button className="btn btn-ghost" onClick={() => go('consultation')} style={{ flex: 1 }}>
                  Schedule full survey
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

window.Availability = Availability;
