import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Logo, Arrow, cn, SectionTag, SignalIcon } from '../src/primitives';

describe('cn', () => {
  it('joins truthy classNames and drops falsy', () => {
    expect(cn('a', false, null, 'b', undefined, 'c')).toBe('a b c');
  });
});

describe('Logo', () => {
  it('renders brand name', () => {
    render(<Logo />);
    expect(screen.getByText('FastNet')).toBeInTheDocument();
  });
});

describe('Arrow', () => {
  it('rotates according to dir prop', () => {
    const { container } = render(<Arrow dir="up" />);
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('style')).toContain('rotate(-90deg)');
  });
});

describe('SectionTag', () => {
  it('renders number label and child', () => {
    render(<SectionTag number="01">Intro</SectionTag>);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Intro')).toBeInTheDocument();
  });
});

describe('SignalIcon', () => {
  it('fills bars according to strength', () => {
    const { container } = render(<SignalIcon strength={2} />);
    const rects = container.querySelectorAll('rect');
    expect(rects).toHaveLength(4);
    expect(rects[0].getAttribute('opacity')).toBe('1');
    expect(rects[3].getAttribute('opacity')).toBe('0.2');
  });
});
