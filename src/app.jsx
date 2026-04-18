// FastNet — App root

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "product",
  "accent": "lime",
  "displayType": "serif",
  "pricingLayout": "cards"
}/*EDITMODE-END*/;

const ACCENT_MAP = {
  lime:  { c: 'oklch(0.86 0.17 118)', soft: 'oklch(0.86 0.17 118 / 0.18)', dim: 'oklch(0.62 0.12 118)' },
  amber: { c: 'oklch(0.82 0.16 85)',  soft: 'oklch(0.82 0.16 85 / 0.18)',  dim: 'oklch(0.6 0.12 85)'  },
  cyan:  { c: 'oklch(0.82 0.12 220)', soft: 'oklch(0.82 0.12 220 / 0.18)', dim: 'oklch(0.6 0.1 220)'  },
  coral: { c: 'oklch(0.78 0.14 30)',  soft: 'oklch(0.78 0.14 30 / 0.18)',  dim: 'oklch(0.58 0.12 30)' },
};

function App() {
  const [route, setRoute] = React.useState(() => {
    try { return localStorage.getItem('fastnet:route') || 'home'; } catch { return 'home'; }
  });
  const [planId, setPlanId] = React.useState('primary');
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);

  // Apply accent color to :root
  React.useEffect(() => {
    const a = ACCENT_MAP[tweaks.accent] || ACCENT_MAP.lime;
    document.documentElement.style.setProperty('--signal', a.c);
    document.documentElement.style.setProperty('--signal-soft', a.soft);
    document.documentElement.style.setProperty('--signal-dim', a.dim);

    // display type swap
    document.documentElement.style.setProperty(
      '--font-display',
      tweaks.displayType === 'sans'
        ? "'Inter Tight', sans-serif"
        : "'Instrument Serif', serif"
    );
  }, [tweaks.accent, tweaks.displayType]);

  const go = (key) => {
    setRoute(key);
    try { localStorage.setItem('fastnet:route', key); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const startCheckout = (pid) => {
    setPlanId(pid);
    go('checkout');
  };

  // Dark theme for certain pages
  const darkTheme = ['availability', 'dashboard'].includes(route);
  React.useEffect(() => {
    document.body.classList.toggle('theme-dark', darkTheme);
  }, [darkTheme]);

  const Hero = {
    editorial: HeroEditorial,
    product: HeroProduct,
    signal: HeroSignal,
  }[tweaks.hero] || HeroEditorial;

  return (
    <>
      <Nav current={route} go={go} theme={darkTheme ? 'dark' : 'light'}/>

      {route === 'home' && (
        <>
          <Hero go={go}/>
          <FailoverExplainer go={go}/>
          <Principles/>
          <PullQuote/>
          <FinalCTA go={go}/>
        </>
      )}

      {route === 'how' && <HowItWorks go={go}/>}
      {route === 'usecases' && <UseCases go={go}/>}
      {route === 'pricing' && <Pricing go={go} startCheckout={startCheckout}/>}
      {route === 'checkout' && <Checkout go={go} planId={planId} setPlanId={setPlanId}/>}
      {route === 'availability' && <Availability go={go}/>}
      {route === 'consultation' && <Consultation go={go}/>}
      {route === 'dashboard' && <Dashboard go={go}/>}

      <Footer go={go}/>
      <Tweaks tweaks={tweaks} setTweaks={setTweaks}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
