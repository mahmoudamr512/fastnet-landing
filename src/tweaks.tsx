import React from 'react';
import { cn } from './primitives';

export interface TweakState {
  hero: 'editorial' | 'product' | 'signal';
  accent: 'lime' | 'amber' | 'cyan' | 'coral';
  displayType: 'serif' | 'sans';
  pricingLayout: 'cards' | 'compare';
}

const HERO_OPTS: Array<[string, string]> = [['editorial', 'Editorial'], ['product', 'Product'], ['signal', 'Signal']];
const ACCENT_SWATCHES: Array<[string, string]> = [
  ['lime',  'oklch(0.86 0.17 118)'],
  ['amber', 'oklch(0.82 0.16 85)'],
  ['cyan',  'oklch(0.82 0.12 220)'],
  ['coral', 'oklch(0.78 0.14 30)'],
];
const TYPE_OPTS: Array<[string, string]> = [['serif', 'Serif'], ['sans', 'Sans']];
const LAYOUT_OPTS: Array<[string, string]> = [['cards', 'Cards'], ['compare', 'Compare']];

const Pill = ({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) => (
  <button onClick={onClick} className={cn(
    'flex-1 py-1.5 text-[11px] font-medium rounded-full',
    active ? 'bg-signal text-ink-900' : 'bg-transparent text-ink-200'
  )}>{children}</button>
);

const Group = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <div className="mono-label mb-2">{label}</div>
    {children}
  </div>
);

const PillRow = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-1 p-0.5 bg-white/[0.06] rounded-full">{children}</div>
);

export const Tweaks = ({ tweaks, setTweaks }: { tweaks: TweakState; setTweaks: (t: TweakState) => void }) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === '__activate_edit_mode') setOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const update = <K extends keyof TweakState>(k: K, v: TweakState[K]) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-3 right-3 md:bottom-5 md:right-5 w-[calc(100vw-24px)] max-w-[320px] md:w-[300px]
                    bg-ink-900/[0.92] backdrop-blur-xl text-bone-100 rounded-[14px] border border-white/10
                    p-5 z-[200] font-sans"
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="signal-dot"/>
          <span className="mono-label text-signal">Tweaks</span>
        </div>
        <button onClick={() => setOpen(false)} className="text-ink-300 text-xs">close</button>
      </div>

      <div className="flex flex-col gap-4">
        <Group label="Hero variant">
          <PillRow>
            {HERO_OPTS.map(o => (
              <Pill key={o[0]} active={tweaks.hero === o[0]} onClick={() => update('hero', o[0] as TweakState['hero'])}>{o[1]}</Pill>
            ))}
          </PillRow>
        </Group>

        <Group label="Accent color">
          <div className="flex gap-2">
            {ACCENT_SWATCHES.map(s => (
              <button key={s[0]} onClick={() => update('accent', s[0] as TweakState['accent'])}
                className={cn(
                  'w-9 h-9 rounded-lg border-2',
                  tweaks.accent === s[0] ? 'border-bone-100' : 'border-transparent'
                )}
                style={{
                  background: s[1],
                  boxShadow: tweaks.accent === s[0] ? `0 0 12px ${s[1]}` : 'none',
                }}/>
            ))}
          </div>
        </Group>

        <Group label="Display type">
          <PillRow>
            {TYPE_OPTS.map(o => (
              <Pill key={o[0]} active={tweaks.displayType === o[0]} onClick={() => update('displayType', o[0] as TweakState['displayType'])}>{o[1]}</Pill>
            ))}
          </PillRow>
        </Group>

        <Group label="Pricing layout">
          <PillRow>
            {LAYOUT_OPTS.map(o => (
              <Pill key={o[0]} active={tweaks.pricingLayout === o[0]} onClick={() => update('pricingLayout', o[0] as TweakState['pricingLayout'])}>{o[1]}</Pill>
            ))}
          </PillRow>
        </Group>
      </div>
    </div>
  );
};

