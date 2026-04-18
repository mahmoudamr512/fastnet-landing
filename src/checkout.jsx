// FastNet — Checkout flow (multi-step)

const ADDON_LIST = [
  { key: 'staticIp',      label: 'Static IP block', price: 25 },
  { key: 'privateEgress', label: 'Private egress', price: 40 },
  { key: 'wifi7',         label: 'Wi-Fi 7 mesh (up to 5 APs)', price: 75 },
];

const STEPS = ['Plan', 'Address', 'Install', 'Payment', 'Confirm'];

const Checkout = ({ go, planId, setPlanId }) => {
  const [step, setStep] = React.useState(1);
  const [address, setAddress] = React.useState({ street: '', unit: '', city: '', zip: '' });
  const [install, setInstall] = React.useState({ date: 'next-week', window: 'morning', contact: '' });
  const [payment, setPayment] = React.useState({ name: '', email: '', card: '' });
  const [addons, setAddons] = React.useState({ staticIp: false, privateEgress: false, wifi7: false });

  const plan = PLANS.find(p => p.id === planId) || PLANS[1];
  const addonsTotal = ADDON_LIST.reduce((a, it) => a + (addons[it.key] ? it.price : 0), 0);
  const monthly = plan.price + addonsTotal;

  return (
    <div className="bg-bone-100 text-ink-900 min-h-screen">
      <section className="py-14 md:pt-20 md:pb-10">
        <div className="container-app">
          <SectionTag number="Checkout">Order FastNet</SectionTag>

          <div className="flex gap-0 mt-10 mb-12 md:mb-15 border-b border-ink-100 overflow-x-auto md:overflow-visible">
            {STEPS.map((s, i) => {
              const idx = i + 1;
              const active = step === idx;
              const done = step > idx;
              return (
                <button key={s} onClick={() => done && setStep(idx)} className={cn(
                  'flex-1 min-w-[120px] md:min-w-0 py-4 text-left -mb-px border-b-2',
                  active ? 'border-ink-900' : 'border-transparent',
                  done ? 'cursor-pointer' : 'cursor-default'
                )}>
                  <div className={cn('mono-label', active || done ? 'text-ink-500' : 'text-ink-300')}>
                    Step {String(idx).padStart(2, '0')}
                  </div>
                  <div className={cn(
                    'text-[17px] font-medium mt-1',
                    active ? 'text-ink-900' : done ? 'text-ink-500' : 'text-ink-300'
                  )}>
                    {s}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid md:grid-cols-[1.6fr_1fr] gap-8 md:gap-12">
            <div>
              {step === 1 && <StepPlan {...{ planId, setPlanId, addons, setAddons }}/>}
              {step === 2 && <StepAddress {...{ address, setAddress }}/>}
              {step === 3 && <StepInstall {...{ install, setInstall }}/>}
              {step === 4 && <StepPayment {...{ payment, setPayment }}/>}
              {step === 5 && <StepConfirm go={go} reset={() => setStep(1)}/>}

              {step < 5 && (
                <div className="flex justify-between mt-12 pt-8 border-t border-ink-100">
                  <button className="btn btn-ghost" onClick={() => step === 1 ? go('pricing') : setStep(step - 1)}>
                    {step === 1 ? 'Back to pricing' : 'Back'}
                  </button>
                  <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                    {step === 4 ? 'Place order' : 'Continue'} <Arrow size={12}/>
                  </button>
                </div>
              )}
            </div>

            {step < 5 && (
              <aside className="p-8 bg-ink-900 text-bone-100 rounded-[18px] h-fit md:sticky md:top-25">
                <div className="mono-label text-signal mb-5">Order summary</div>
                <div className="flex justify-between pb-4 border-b border-white/10">
                  <div>
                    <div className="text-[17px] font-medium">{plan.name}</div>
                    <div className="caption text-ink-300 mt-1">{plan.tagline}</div>
                  </div>
                  <div className="font-medium">${plan.price}</div>
                </div>

                {ADDON_LIST.map(a => addons[a.key] && (
                  <div key={a.key} className="flex justify-between pt-4 text-sm text-ink-200">
                    <span>{a.label}</span>
                    <span>+${a.price}</span>
                  </div>
                ))}

                <div className="pt-5 mt-5 border-t border-white/10">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[15px]">Monthly total</span>
                    <span className="font-display text-[44px]">${monthly}</span>
                  </div>
                  <div className="mono-sm text-ink-400 mt-1 text-right">+ $0 hardware · $0 install</div>
                </div>

                <div className="mt-6 p-3.5 bg-white/[0.04] rounded-[10px] mono-sm text-ink-200">
                  ✓ Hardware installed<br/>
                  ✓ 24/7 NOC monitoring<br/>
                  ✓ 30-day satisfaction guarantee
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const StepPlan = ({ planId, setPlanId, addons, setAddons }) => (
  <div>
    <h2 className="headline m-0 mb-2">Choose your plan</h2>
    <p className="body text-ink-400 mb-8">You can change this later, before install.</p>

    <div className="flex flex-col gap-4">
      {PLANS.map(p => {
        const selected = planId === p.id;
        return (
          <button key={p.id} onClick={() => setPlanId(p.id)} className={cn(
            'p-6 text-left rounded-[14px] bg-bone-50 flex justify-between items-center transition-all',
            selected ? 'border-[1.5px] border-ink-900' : 'border-[1.5px] border-ink-100'
          )}>
            <div>
              <div className="flex items-center gap-2.5">
                <span className={cn(
                  'w-4.5 h-4.5 rounded-full border-[1.5px] flex items-center justify-center',
                  selected ? 'border-ink-900' : 'border-ink-200'
                )}>
                  {selected && <span className="w-2 h-2 rounded-full bg-ink-900"/>}
                </span>
                <span className="text-[20px] font-medium">{p.name}</span>
              </div>
              <div className="caption mt-1.5 ml-7 max-w-[46ch]">{p.tagline}</div>
            </div>
            <div className="text-right">
              <div className="font-display text-[40px] leading-none">${p.price}</div>
              <div className="mono-sm text-ink-400">/ month</div>
            </div>
          </button>
        );
      })}
    </div>

    <h3 className="text-base font-medium mt-12 mb-4">Add-ons</h3>
    <div className="flex flex-col gap-2.5">
      {ADDON_LIST.map(a => (
        <label key={a.key} className={cn(
          'px-4.5 py-3.5 border border-ink-100 rounded-[10px] flex items-center gap-3.5 cursor-pointer',
          addons[a.key] ? 'bg-bone-200' : 'bg-bone-50'
        )}>
          <input type="checkbox" checked={addons[a.key]}
            onChange={e => setAddons({...addons, [a.key]: e.target.checked})}
            style={{ accentColor: 'var(--color-ink-900)' }}/>
          <span className="flex-grow text-sm">{a.label}</span>
          <span className="mono-sm text-ink-500">+${a.price} / mo</span>
        </label>
      ))}
    </div>
  </div>
);

const StepAddress = ({ address, setAddress }) => (
  <div>
    <h2 className="headline m-0 mb-2">Install address</h2>
    <p className="body text-ink-400 mb-8">We'll verify coverage here. No equipment ships until confirmed.</p>
    <div className="flex flex-col gap-3 max-w-[540px]">
      <input className="input" placeholder="Street address"
        value={address.street} onChange={e => setAddress({...address, street: e.target.value})}/>
      <div className="grid grid-cols-2 gap-3">
        <input className="input" placeholder="Unit (optional)"
          value={address.unit} onChange={e => setAddress({...address, unit: e.target.value})}/>
        <input className="input" placeholder="City"
          value={address.city} onChange={e => setAddress({...address, city: e.target.value})}/>
      </div>
      <input className="input" placeholder="ZIP code" maxLength={5}
        value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})}/>
    </div>

    <div className="mt-8 p-5 bg-bone-50 rounded-xl border border-ink-100 max-w-[540px]">
      <div className="flex items-center gap-2.5">
        <span className="signal-dot"/>
        <span className="mono-label">Coverage estimate</span>
      </div>
      <div className="flex flex-wrap gap-6 justify-between mt-4">
        <div><div className="caption">Primary carrier</div><div className="font-medium">Excellent (-68 dBm)</div></div>
        <div><div className="caption">Secondary</div><div className="font-medium">Good (-82 dBm)</div></div>
        <div><div className="caption">Verdict</div><div className="font-medium text-[oklch(0.55_0.15_155)]">Qualifies</div></div>
      </div>
    </div>
  </div>
);

const StepInstall = ({ install, setInstall }) => (
  <div>
    <h2 className="headline m-0 mb-2">Schedule install</h2>
    <p className="body text-ink-400 mb-8">A FastNet engineer will be on site for 60–120 minutes.</p>

    <div className="mono-label mb-3">Target week</div>
    <div className="flex flex-wrap gap-2.5 mb-8">
      {[
        ['this-week', 'This week', '+$250 expedited'],
        ['next-week', 'Next week', 'No charge'],
        ['two-weeks', 'In 2 weeks', 'No charge'],
        ['flexible',  'Flexible', 'No charge'],
      ].map(o => (
        <button key={o[0]} onClick={() => setInstall({...install, date: o[0]})} className={cn(
          'px-5 py-4 rounded-xl bg-bone-50 text-left',
          install.date === o[0] ? 'border-[1.5px] border-ink-900' : 'border-[1.5px] border-ink-100'
        )}>
          <div className="font-medium">{o[1]}</div>
          <div className="caption mt-1">{o[2]}</div>
        </button>
      ))}
    </div>

    <div className="mono-label mb-3">Window</div>
    <div className="flex flex-wrap gap-2.5 mb-8">
      {['morning', 'afternoon', 'evening'].map(w => (
        <button key={w} onClick={() => setInstall({...install, window: w})} className={cn(
          'px-6 py-3.5 rounded-full text-sm capitalize',
          install.window === w
            ? 'border-[1.5px] border-ink-900 bg-ink-900 text-bone-100'
            : 'border-[1.5px] border-ink-100 bg-bone-50 text-ink-900'
        )}>
          {w}
        </button>
      ))}
    </div>

    <div className="mono-label mb-3">On-site contact</div>
    <input className="input max-w-[340px]" placeholder="Phone number"
      value={install.contact} onChange={e => setInstall({...install, contact: e.target.value})}/>
  </div>
);

const StepPayment = ({ payment, setPayment }) => (
  <div>
    <h2 className="headline m-0 mb-2">Payment</h2>
    <p className="body text-ink-400 mb-8">First charge on install day. No authorization hold.</p>
    <div className="flex flex-col gap-3 max-w-[540px]">
      <input className="input" placeholder="Full name"
        value={payment.name} onChange={e => setPayment({...payment, name: e.target.value})}/>
      <input className="input" placeholder="Email for invoices"
        value={payment.email} onChange={e => setPayment({...payment, email: e.target.value})}/>
      <input className="input" placeholder="Card number"
        value={payment.card} onChange={e => setPayment({...payment, card: e.target.value})}/>
      <div className="grid grid-cols-2 gap-3">
        <input className="input" placeholder="MM / YY"/>
        <input className="input" placeholder="CVC"/>
      </div>
    </div>
    <div className="mono-sm mt-5 text-ink-400">🔒 Secured by Stripe. We never store card numbers.</div>
  </div>
);

const StepConfirm = ({ go, reset }) => (
  <div className="text-center py-10">
    <div className="w-20 h-20 rounded-full bg-signal flex items-center justify-center mx-auto mb-6"
      style={{ boxShadow: '0 0 40px var(--color-signal-soft)' }}>
      <svg width="36" height="36" viewBox="0 0 24 24">
        <path d="M4 12 L10 18 L20 6" stroke="var(--color-ink-900)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
    <h2 className="headline m-0">You're booked.</h2>
    <p className="body-lg text-ink-400 mt-4 max-w-[42ch] mx-auto">
      Order <span className="mono-sm text-ink-900">#FN-2026-04821</span>.
      A FastNet engineer will call within 24 hours to confirm your install window.
    </p>
    <div className="flex flex-col sm:flex-row gap-2.5 justify-center mt-10">
      <button className="btn btn-primary" onClick={() => go('dashboard')}>
        Preview your dashboard <Arrow size={12}/>
      </button>
      <button className="btn btn-ghost" onClick={() => { reset(); go('home'); }}>Back to site</button>
    </div>
  </div>
);

window.Checkout = Checkout;
