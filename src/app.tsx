import React, { useEffect, useState } from 'react';
import { AuthorBadge, type GoFn } from './primitives';
import { Nav } from './nav';
import { HeroEditorial, HeroProduct, HeroSignal } from './hero';
import { FailoverExplainer, Principles, PullQuote, FinalCTA, Footer } from './sections';
import { HowItWorks } from './howitworks';
import { UseCases } from './usecases';
import { Pricing } from './pricing';
import { Checkout } from './checkout';
import { Availability } from './availability';
import { Consultation } from './consultation';
import { Dashboard } from './dashboard';
import { About } from './about';
import { Tweaks, type TweakState } from './tweaks';

const TWEAK_DEFAULTS: TweakState = {
  hero: 'product',
  accent: 'lime',
  displayType: 'serif',
  pricingLayout: 'cards',
};

const ACCENT_MAP: Record<TweakState['accent'], { c: string; soft: string; dim: string }> = {
  lime:  { c: 'oklch(0.86 0.17 118)', soft: 'oklch(0.86 0.17 118 / 0.18)', dim: 'oklch(0.62 0.12 118)' },
  amber: { c: 'oklch(0.82 0.16 85)',  soft: 'oklch(0.82 0.16 85 / 0.18)',  dim: 'oklch(0.6 0.12 85)'  },
  cyan:  { c: 'oklch(0.82 0.12 220)', soft: 'oklch(0.82 0.12 220 / 0.18)', dim: 'oklch(0.6 0.1 220)'  },
  coral: { c: 'oklch(0.78 0.14 30)',  soft: 'oklch(0.78 0.14 30 / 0.18)',  dim: 'oklch(0.58 0.12 30)' },
};

type RouteKey =
  | 'home' | 'how' | 'usecases' | 'pricing' | 'checkout'
  | 'availability' | 'consultation' | 'dashboard' | 'about';

interface RouteMeta { path: string; title: string; desc: string }

const ROUTE_META: Record<RouteKey, RouteMeta> = {
  home:          { path: '/',              title: 'FastNet — Resilient 5G Internet · Built by Mahmoud Amr',     desc: 'Showcase landing site for a premium 5G internet brand — designed and built by Mahmoud Amr, senior software engineer based in Cairo.' },
  how:           { path: '/how-it-works',  title: 'How it works · FastNet Showcase by Mahmoud Amr',              desc: 'Five-step technical breakdown of the FastNet showcase by Mahmoud Amr — site survey, hardware, carrier-diverse routing, packet core, monitoring.' },
  usecases:      { path: '/use-cases',     title: 'Use cases · FastNet Showcase by Mahmoud Amr',                 desc: 'Residential and business deployment scenarios for the FastNet 5G showcase, designed and built by Mahmoud Amr in Cairo.' },
  pricing:       { path: '/pricing',       title: 'Pricing · FastNet Showcase by Mahmoud Amr',                   desc: 'Two flat-rate plans for the FastNet showcase landing site by Mahmoud Amr — Failover and Primary, with optional add-ons and FAQ.' },
  checkout:      { path: '/checkout',      title: 'Checkout · FastNet Showcase by Mahmoud Amr',                  desc: 'Five-step checkout flow with a sticky order summary — part of the FastNet showcase landing site by Mahmoud Amr.' },
  availability:  { path: '/availability',  title: 'Coverage check · FastNet Showcase by Mahmoud Amr',            desc: 'ZIP-based 5G coverage checker with carrier signal strengths — interactive demo from the FastNet showcase by Mahmoud Amr.' },
  consultation:  { path: '/consultation',  title: 'Consultation · FastNet Showcase by Mahmoud Amr',              desc: 'Calendar-based consultation booking demo with form validation — part of the FastNet showcase landing site by Mahmoud Amr.' },
  dashboard:     { path: '/dashboard',     title: 'Customer dashboard preview · FastNet by Mahmoud Amr',         desc: 'Live throughput chart, simulate-outage demo, and event log — customer dashboard preview from the FastNet showcase by Mahmoud Amr.' },
  about:         { path: '/about',         title: 'About Mahmoud Amr — Senior Software Engineer, Cairo',         desc: 'Mahmoud Amr — senior software engineer based in Cairo. Full-stack, AI and automation. Freelancing since 2016. Available on Upwork.' },
};

const PATH_TO_ROUTE: Record<string, RouteKey> = Object.fromEntries(
  (Object.entries(ROUTE_META) as Array<[RouteKey, RouteMeta]>).map(([k, v]) => [v.path, k])
);

const routeFromPath = (): RouteKey =>
  PATH_TO_ROUTE[window.location.pathname] ?? 'home';

const HERO_VARIANTS: Record<TweakState['hero'], React.FC<{ go: GoFn }>> = {
  editorial: HeroEditorial,
  product: HeroProduct,
  signal: HeroSignal,
};

const setMetaContent = (selector: string, value: string) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute('content', value);
};

export const App = () => {
  const [route, setRoute] = useState<RouteKey>(routeFromPath);
  const [planId, setPlanId] = useState<string>('primary');
  const [tweaks, setTweaks] = useState<TweakState>(TWEAK_DEFAULTS);

  useEffect(() => {
    const a = ACCENT_MAP[tweaks.accent] ?? ACCENT_MAP.lime;
    const root = document.documentElement;
    root.style.setProperty('--signal', a.c);
    root.style.setProperty('--signal-soft', a.soft);
    root.style.setProperty('--signal-dim', a.dim);
    root.style.setProperty(
      '--font-display',
      tweaks.displayType === 'sans' ? "'Inter Tight', sans-serif" : "'Instrument Serif', serif"
    );
  }, [tweaks.accent, tweaks.displayType]);

  useEffect(() => {
    const meta = ROUTE_META[route];
    document.title = meta.title;
    setMetaContent('meta[name="description"]', meta.desc);
    setMetaContent('meta[property="og:title"]', meta.title);
    setMetaContent('meta[property="og:description"]', meta.desc);
    setMetaContent('meta[name="twitter:title"]', meta.title);
    setMetaContent('meta[name="twitter:description"]', meta.desc);
    setMetaContent('meta[itemprop="name"]', meta.title);
    setMetaContent('meta[itemprop="description"]', meta.desc);

    const url = `https://fastnet-landing.vercel.app${meta.path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);
    setMetaContent('meta[property="og:url"]', url);
    setMetaContent('meta[name="twitter:url"]', url);
  }, [route]);

  const go: GoFn = (key) => {
    const routeKey = (key as RouteKey) in ROUTE_META ? (key as RouteKey) : 'home';
    const meta = ROUTE_META[routeKey];
    if (window.location.pathname !== meta.path) {
      window.history.pushState({ route: routeKey }, '', meta.path);
    }
    setRoute(routeKey);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const onPop = () => setRoute(routeFromPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const startCheckout = (pid: string) => {
    setPlanId(pid);
    go('checkout');
  };

  const darkTheme = route === 'availability' || route === 'dashboard';
  useEffect(() => {
    document.body.classList.toggle('theme-dark', darkTheme);
  }, [darkTheme]);

  const Hero = HERO_VARIANTS[tweaks.hero] ?? HeroEditorial;

  return (
    <>
      <Nav current={route} go={go} theme={darkTheme ? 'dark' : 'light'} />

      {route === 'home' && (
        <>
          <Hero go={go} />
          <FailoverExplainer go={go} />
          <Principles />
          <PullQuote />
          <FinalCTA go={go} />
        </>
      )}

      {route === 'how' && <HowItWorks go={go} />}
      {route === 'usecases' && <UseCases go={go} />}
      {route === 'pricing' && <Pricing go={go} startCheckout={startCheckout} />}
      {route === 'checkout' && <Checkout go={go} planId={planId} setPlanId={setPlanId} />}
      {route === 'availability' && <Availability go={go} />}
      {route === 'consultation' && <Consultation go={go} />}
      {route === 'dashboard' && <Dashboard go={go} />}
      {route === 'about' && <About go={go} />}

      <Footer go={go} />
      <AuthorBadge go={go} />
      <Tweaks tweaks={tweaks} setTweaks={setTweaks} />
    </>
  );
};
