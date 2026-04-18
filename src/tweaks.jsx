// FastNet — Tweaks panel

const Tweaks = ({ tweaks, setTweaks }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === '__activate_edit_mode') setOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const update = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  if (!open) return null;

  const heroOpts = [
    ['editorial', 'Editorial'],
    ['product', 'Product'],
    ['signal', 'Signal'],
  ];

  const accentSwatches = [
    ['lime', 'oklch(0.86 0.17 118)'],
    ['amber', 'oklch(0.82 0.16 85)'],
    ['cyan', 'oklch(0.82 0.12 220)'],
    ['coral', 'oklch(0.78 0.14 30)'],
  ];

  return (
    <div data-tweaks-panel style={{
      position: 'fixed', bottom: 20, right: 20,
      width: 300,
      background: 'rgba(10,11,13,0.92)',
      backdropFilter: 'blur(20px)',
      color: 'var(--bone-100)',
      borderRadius: 14,
      border: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      padding: 20,
      zIndex: 200,
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="signal-dot"/>
          <span className="mono-label" style={{ color: 'var(--signal)' }}>Tweaks</span>
        </div>
        <button onClick={() => setOpen(false)} style={{ color: 'var(--ink-300)', fontSize: 12 }}>close</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <div className="mono-label" style={{ marginBottom: 8 }}>Hero variant</div>
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
            {heroOpts.map(o => (
              <button key={o[0]} onClick={() => update('hero', o[0])}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 11, borderRadius: 999,
                  background: tweaks.hero === o[0] ? 'var(--signal)' : 'transparent',
                  color: tweaks.hero === o[0] ? 'var(--ink-900)' : 'var(--ink-200)',
                  fontWeight: 500,
                }}>{o[1]}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-label" style={{ marginBottom: 8 }}>Accent color</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {accentSwatches.map(s => (
              <button key={s[0]} onClick={() => update('accent', s[0])}
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: s[1],
                  border: tweaks.accent === s[0] ? '2px solid var(--bone-100)' : '2px solid transparent',
                  boxShadow: tweaks.accent === s[0] ? `0 0 12px ${s[1]}` : 'none',
                }}/>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-label" style={{ marginBottom: 8 }}>Display type</div>
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
            {[
              ['serif', 'Serif'],
              ['sans', 'Sans'],
            ].map(o => (
              <button key={o[0]} onClick={() => update('displayType', o[0])}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 11, borderRadius: 999,
                  background: tweaks.displayType === o[0] ? 'var(--signal)' : 'transparent',
                  color: tweaks.displayType === o[0] ? 'var(--ink-900)' : 'var(--ink-200)',
                  fontWeight: 500,
                }}>{o[1]}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="mono-label" style={{ marginBottom: 8 }}>Pricing layout</div>
          <div style={{ display: 'flex', gap: 4, padding: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 999 }}>
            {[
              ['cards', 'Cards'],
              ['compare', 'Compare'],
            ].map(o => (
              <button key={o[0]} onClick={() => update('pricingLayout', o[0])}
                style={{
                  flex: 1, padding: '6px 0', fontSize: 11, borderRadius: 999,
                  background: tweaks.pricingLayout === o[0] ? 'var(--signal)' : 'transparent',
                  color: tweaks.pricingLayout === o[0] ? 'var(--ink-900)' : 'var(--ink-200)',
                  fontWeight: 500,
                }}>{o[1]}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.Tweaks = Tweaks;
