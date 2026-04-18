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

const ROUTE_META = {
  home:          { path: '/',              title: 'FastNet — Resilient 5G Internet · Built by Mahmoud Amr',     desc: 'Showcase landing site for a premium 5G internet brand — designed and built by Mahmoud Amr, senior software engineer based in Cairo.' },
  how:           { path: '/how-it-works',  title: 'How it works · FastNet Showcase by Mahmoud Amr',              desc: 'Five-step technical breakdown of the FastNet showcase by Mahmoud Amr — site survey, hardware, carrier-diverse routing, packet core, monitoring.' },
  usecases:      { path: '/use-cases',     title: 'Use cases · FastNet Showcase by Mahmoud Amr',                 desc: 'Residential and business deployment scenarios for the FastNet 5G showcase, designed and built by Mahmoud Amr in Cairo.' },
  pricing:       { path: '/pricing',       title: 'Pricing · FastNet Showcase by Mahmoud Amr',                   desc: 'Two flat-rate plans for the FastNet showcase landing site by Mahmoud Amr — Failover and Primary, with optional add-ons and FAQ.' },
  checkout:      { path: '/checkout',      title: 'Checkout · FastNet Showcase by Mahmoud Amr',                  desc: 'Five-step checkout flow with a sticky order summary — part of the FastNet showcase landing site by Mahmoud Amr.' },
  availability:  { path: '/availability',  title: 'Coverage check · FastNet Showcase by Mahmoud Amr',            desc: 'ZIP-based 5G coverage checker with carrier signal strengths — interactive demo from the FastNet showcase by Mahmoud Amr.' },
  consultation:  { path: '/consultation',  title: 'Consultation · FastNet Showcase by Mahmoud Amr',              desc: 'Calendar-based consultation booking demo with form validation — part of the FastNet showcase landing site by Mahmoud Amr.' },
  dashboard:     { path: '/dashboard',     title: 'Customer dashboard preview · FastNet by Mahmoud Amr',         desc: 'Live throughput chart, simulate-outage demo, and event log — customer dashboard preview from the FastNet showcase by Mahmoud Amr.' },
  about:         { path: '/about',         title: 'About Mahmoud Amr — Senior Software Engineer, Cairo',          desc: 'Mahmoud Amr — senior software engineer based in Cairo. Full-stack, AI and automation. Freelancing since 2016. Available on Upwork.' },
};

const PATH_TO_ROUTE = Object.fromEntries(Object.entries(ROUTE_META).map(([k, v]) => [v.path, k]));

const routeFromPath = () => PATH_TO_ROUTE[window.location.pathname] || 'home';

function App() {
  const [route, setRoute] = React.useState(routeFromPath);
  const [planId, setPlanId] = React.useState('primary');
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const a = ACCENT_MAP[tweaks.accent] || ACCENT_MAP.lime;
    document.documentElement.style.setProperty('--signal', a.c);
    document.documentElement.style.setProperty('--signal-soft', a.soft);
    document.documentElement.style.setProperty('--signal-dim', a.dim);
    document.documentElement.style.setProperty(
      '--font-display',
      tweaks.displayType === 'sans' ? "'Inter Tight', sans-serif" : "'Instrument Serif', serif"
    );
  }, [tweaks.accent, tweaks.displayType]);

  // Sync title + description + canonical on route change
  React.useEffect(() => {
    const meta = ROUTE_META[route] || ROUTE_META.home;
    document.title = meta.title;
    const setMeta = (sel, val) => {
      const el = document.querySelector(sel);
      if (el) el.setAttribute('content', val);
    };
    setMeta('meta[name="description"]', meta.desc);
    setMeta('meta[property="og:title"]', meta.title);
    setMeta('meta[property="og:description"]', meta.desc);
    setMeta('meta[name="twitter:title"]', meta.title);
    setMeta('meta[name="twitter:description"]', meta.desc);
    setMeta('meta[itemprop="name"]', meta.title);
    setMeta('meta[itemprop="description"]', meta.desc);

    const url = `https://fastnet-landing.vercel.app${meta.path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', url);
    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', url);
  }, [route]);

  // Browser history
  const go = (key) => {
    const meta = ROUTE_META[key] || ROUTE_META.home;
    if (window.location.pathname !== meta.path) {
      window.history.pushState({ route: key }, '', meta.path);
    }
    setRoute(key);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  React.useEffect(() => {
    const onPop = () => setRoute(routeFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const startCheckout = (pid) => { setPlanId(pid); go('checkout'); };

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
      {route === 'about' && <About go={go}/>}

      <Footer go={go}/>
      <AuthorBadge go={go}/>
      <Tweaks tweaks={tweaks} setTweaks={setTweaks}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
