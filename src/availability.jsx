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
      const sum = zip.split('').reduce((a, c) => a + parseInt(c) || 0, 0);
      const verdict = sum % 4 === 0 ? 'marginal' : 'qualified';
      setResult({
        verdict,
        carriers: [
          { name: 'Primary 5G',   signal: verdict === 'qualified' ? -68 : -92, bands: 'n41 · n77' },
          { name: 'Secondary 5G', signal: verdict === 'qualified' ? -75 : -96, bands: 'n71 · n258' },
          { name: 'Regional',     signal: -84, bands: 'n77' },
        ],
        peakMbps: verdict === 'qualified' ? 940 : 420,
      });
      setChecking(false);
    }, 1400);
  };

  return (
    <div className="bg-ink-900 text-bone-100 min-h-[calc(100vh-64px)]">
      <section className="pt-20 pb-14 md:pt-30 md:pb-20 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 60%)' }}/>
        <div className="container-app relative text-center">
          <SectionTag number="Coverage">30-second check</SectionTag>
          <h1 className="display-2 mx-auto max-w-[18ch]">
            Is your address <span className="italic text-signal">FastNet-ready?</span>
          </h1>
          <p className="body-lg text-ink-200 max-w-[46ch] mx-auto mt-6 mb-12">
            Enter your ZIP. We query live tower data and return a signal verdict in under a minute.
          </p>

          <div className="flex gap-2.5 max-w-[520px] mx-auto bg-white/[0.04] border border-white/10 rounded-full p-2">
            <input
              placeholder="90210" maxLength={5} value={zip}
              onChange={e => setZip(e.target.value.replace(/\D/g, ''))}
              onKeyDown={e => e.key === 'Enter' && check()}
              className="flex-grow bg-transparent border-0 px-5 text-lg font-mono tracking-widest text-bone-100 outline-none"
            />
            <button onClick={check} disabled={checking || zip.length < 5}
              className={cn('btn btn-signal', zip.length < 5 && 'opacity-50')}>
              {checking ? 'Checking…' : 'Check signal'} <Arrow size={12}/>
            </button>
          </div>

          {checking && (
            <div className="mt-8 flex justify-center gap-2">
              {[0,1,2].map(i => (
                <span key={i} className="w-2 h-2 rounded-full bg-signal"
                  style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}/>
              ))}
            </div>
          )}

          {result && (
            <div className="max-w-[680px] mx-auto mt-14 bg-ink-800 border border-white/[0.08] rounded-[18px] p-8 text-left">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div>
                  <div className="mono-label text-signal">ZIP {zip}</div>
                  <div className={cn(
                    'text-[28px] font-medium mt-1.5',
                    result.verdict === 'qualified' ? 'text-signal' : 'text-[var(--color-status-amber)]'
                  )}>
                    {result.verdict === 'qualified' ? 'Qualified for FastNet' : 'Marginal — survey recommended'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="mono-label">Est. peak</div>
                  <div className="font-display text-[48px] leading-none mt-1">
                    {result.peakMbps} <span className="text-lg">Mbps</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/[0.06]">
                {result.carriers.map((c, i) => (
                  <div key={i} className={cn(
                    'flex justify-between items-center py-3.5',
                    i < result.carriers.length - 1 && 'border-b border-white/[0.06]'
                  )}>
                    <div>
                      <div className="font-medium">{c.name}</div>
                      <div className="mono-sm text-ink-400">{c.bands}</div>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <SignalIcon strength={c.signal > -80 ? 4 : c.signal > -90 ? 3 : 2}/>
                      <span className="mono-sm text-ink-200 w-[70px] text-right">{c.signal} dBm</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 mt-7">
                <button className="btn btn-signal flex-1" onClick={() => go('pricing')}>
                  Continue to plans <Arrow size={12}/>
                </button>
                <button className="btn btn-ghost flex-1" onClick={() => go('consultation')}>
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
