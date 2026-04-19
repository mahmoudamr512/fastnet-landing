import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Nav } from '../src/nav';
import { HeroEditorial, HeroProduct, HeroSignal } from '../src/hero';
import { FailoverExplainer, Principles, PullQuote, FinalCTA, Footer } from '../src/sections';
import { HowItWorks } from '../src/howitworks';
import { UseCases } from '../src/usecases';
import { Pricing } from '../src/pricing';
import { Checkout } from '../src/checkout';
import { Availability } from '../src/availability';
import { Consultation } from '../src/consultation';
import { Dashboard } from '../src/dashboard';
import { About } from '../src/about';
import { Tweaks } from '../src/tweaks';
import { AuthorBadge } from '../src/primitives';

const go = vi.fn();
const startCheckout = vi.fn();
const setPlanId = vi.fn();
const setTweaks = vi.fn();
const tweaks = {
  hero: 'product' as const,
  accent: 'lime' as const,
  displayType: 'serif' as const,
  pricingLayout: 'cards' as const,
};

describe('page-level smoke renders', () => {
  it('Nav renders both themes', () => {
    const { rerender } = render(<Nav current="home" go={go} theme="light" />);
    expect(screen.getByText('FastNet')).toBeInTheDocument();
    rerender(<Nav current="about" go={go} theme="dark" />);
    expect(screen.getByText('FastNet')).toBeInTheDocument();
  });

  it('HeroEditorial renders', () => {
    render(<HeroEditorial go={go} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('HeroProduct renders', () => {
    render(<HeroProduct go={go} />);
    expect(screen.getByText(/fastnet beacon/i)).toBeInTheDocument();
  });

  it('HeroSignal renders', () => {
    render(<HeroSignal go={go} />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('FailoverExplainer renders', () => {
    render(<FailoverExplainer go={go} />);
    expect(screen.getAllByText(/failover|primary/i).length).toBeGreaterThan(0);
  });

  it('Principles renders', () => {
    render(<Principles />);
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0);
  });

  it('PullQuote renders', () => {
    render(<PullQuote />);
    expect(screen.getByText(/alessandra moreau/i)).toBeInTheDocument();
  });

  it('FinalCTA renders', () => {
    render(<FinalCTA go={go} />);
    expect(screen.getAllByText(/check availability/i).length).toBeGreaterThan(0);
  });

  it('Footer renders', () => {
    render(<Footer go={go} />);
    expect(screen.getAllByText(/mahmoud amr/i).length).toBeGreaterThan(0);
  });

  it('HowItWorks renders 5 steps', () => {
    render(<HowItWorks go={go} />);
    expect(screen.getByText('Site survey')).toBeInTheDocument();
    expect(screen.getByText('24/7 monitoring')).toBeInTheDocument();
  });

  it('UseCases renders both tabs', () => {
    render(<UseCases go={go} />);
    expect(screen.getByRole('button', { name: 'Residential' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Business' })).toBeInTheDocument();
  });

  it('Pricing renders both plans', () => {
    render(<Pricing go={go} startCheckout={startCheckout} />);
    expect(screen.getByText('FastNet Failover')).toBeInTheDocument();
    expect(screen.getByText('FastNet Primary')).toBeInTheDocument();
  });

  it('Checkout renders stepper', () => {
    render(<Checkout go={go} planId="primary" setPlanId={setPlanId} />);
    expect(screen.getByText(/choose your plan/i)).toBeInTheDocument();
  });

  it('Availability renders ZIP input', () => {
    render(<Availability go={go} />);
    expect(screen.getByPlaceholderText('90210')).toBeInTheDocument();
  });

  it('Consultation renders day picker', () => {
    render(<Consultation go={go} />);
    expect(screen.getByRole('heading', { name: /pick a slot/i })).toBeInTheDocument();
  });

  it('Dashboard renders KPI labels', () => {
    render(<Dashboard go={go} />);
    expect(screen.getByText('Pacific Palisades')).toBeInTheDocument();
  });

  it('About renders name and links', () => {
    render(<About go={go} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/mahmoud/i);
  });

  it('AuthorBadge renders collapsed badge', () => {
    render(<AuthorBadge go={go} />);
    expect(screen.getByText(/by mahmoud amr/i)).toBeInTheDocument();
  });

  it('Tweaks renders nothing by default (closed)', () => {
    const { container } = render(<Tweaks tweaks={tweaks} setTweaks={setTweaks} />);
    expect(container.firstChild).toBeNull();
  });
});
