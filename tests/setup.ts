import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom lacks IntersectionObserver — stub for scroll-reveal primitives
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];
}
// @ts-expect-error assign global
globalThis.IntersectionObserver = MockIntersectionObserver;

// jsdom lacks canvas 2d context — stub for HeroSignal canvas animation
HTMLCanvasElement.prototype.getContext = vi.fn(() => null) as never;

// requestAnimationFrame fallback
if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16) as unknown as number;
  globalThis.cancelAnimationFrame = (id) => clearTimeout(id as unknown as NodeJS.Timeout);
}
