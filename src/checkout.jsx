// FastNet — Checkout flow (multi-step)

const Checkout = ({ go, planId, setPlanId }) => {
  const [step, setStep] = React.useState(1);
  const [address, setAddress] = React.useState({ street: '', unit: '', city: '', zip: '' });
  const [install, setInstall] = React.useState({ date: 'next-week', window: 'morning', contact: '' });
  const [payment, setPayment] = React.useState({ name: '', email: '', card: '' });
  const [addons, setAddons] = React.useState({ staticIp: false, privateEgress: false, wifi7: false });

  const plan = PLANS.find(p => p.id === planId) || PLANS[1];
  const addonList = [
    { key: 'staticIp', label: 'Static IP block', price: 25 },
    { key: 'privateEgress', label: 'Private egress', price: 40 },
    { key: 'wifi7', label: 'Wi-Fi 7 mesh (up to 5 APs)', price: 75 },
  ];
  const addonsTotal = addonList.reduce((a, it) => a + (addons[it.key] ? it.price : 0), 0);
  const monthly = plan.price + addonsTotal;

  const steps = ['Plan', 'Address', 'Install', 'Payment', 'Confirm'];

  return (
    <div style={{ background: 'var(--bone-100)', color: 'var(--ink-900)', minHeight: '100vh' }}>
      <section style={{ padding: '80px 0 40px' }}>
        <div className="container">
          <SectionTag number="Checkout">Order FastNet</SectionTag>

          {/* Stepper */}
          <div data-checkout-stepper style={{ display: 'flex', gap: 0, marginTop: 40, marginBottom: 60,
            borderBottom: '1px solid var(--ink-100)' }}>
            {steps.map((s, i) => {
              const idx = i + 1;
              const active = step === idx;
              const done = step > idx;
              return (
                <button key={s} onClick={() => done && setStep(idx)}
                  style={{
                    flex: 1, padding: '16px 0', textAlign: 'left',
                    borderBottom: active ? '2px solid var(--ink-900)' : '2px solid transparent',
                    marginBottom: -1,
                    cursor: done ? 'pointer' : 'default',
                  }}>
                  <div className="mono-label" style={{ color: active || done ? 'var(--ink-500)' : 'var(--ink-300)' }}>
                    Step {String(idx).padStart(2, '0')}
                  </div>
                  <div style={{
                    fontSize: 17, fontWeight: 500, marginTop: 4,
                    color: active ? 'var(--ink-900)' : done ? 'var(--ink-500)' : 'var(--ink-300)',
                  }}>
                    {s}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 48 }}>
            {/* Step content */}
            <div>
              {step === 1 && (
                <div>
                  <h2 className="headline" style={{ margin: 0, marginBottom: 8 }}>Choose your plan</h2>
                  <p className="body" style={{ color: 'var(--ink-400)', marginBottom: 32 }}>
                    You can change this later, before install.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {PLANS.map(p => (
                      <button key={p.id} onClick={() => setPlanId(p.id)}
                        style={{
                          padding: 24,
                          textAlign: 'left',
                          border: `1.5px solid ${planId === p.id ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                          borderRadius: 14,
                          background: 'var(--bone-50)',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          transition: 'all .15s ease',
                        }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: '50%',
                              border: `1.5px solid ${planId === p.id ? 'var(--ink-900)' : 'var(--ink-200)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              {planId === p.id && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ink-900)'}}/>}
                            </span>
                            <span style={{ fontSize: 20, fontWeight: 500 }}>{p.name}</span>
                          </div>
                          <div className="caption" style={{ marginTop: 6, marginLeft: 28, maxWidth: '46ch' }}>{p.tagline}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, lineHeight: 1 }}>${p.price}</div>
                          <div className="mono-sm" style={{ color: 'var(--ink-400)' }}>/ month</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <h3 style={{ fontSize: 16, fontWeight: 500, marginTop: 48, marginBottom: 16 }}>Add-ons</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {addonList.map(a => (
                      <label key={a.key} style={{
                        padding: '14px 18px', border: '1px solid var(--ink-100)', borderRadius: 10,
                        background: addons[a.key] ? 'var(--bone-200)' : 'var(--bone-50)',
                        display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
                      }}>
                        <input type="checkbox" checked={addons[a.key]}
                          onChange={e => setAddons({...addons, [a.key]: e.target.checked})}
                          style={{ accentColor: 'var(--ink-900)' }}/>
                        <span style={{ flexGrow: 1, fontSize: 14 }}>{a.label}</span>
                        <span className="mono-sm" style={{ color: 'var(--ink-500)' }}>+${a.price} / mo</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="headline" style={{ margin: 0, marginBottom: 8 }}>Install address</h2>
                  <p className="body" style={{ color: 'var(--ink-400)', marginBottom: 32 }}>
                    We'll verify coverage here. No equipment ships until confirmed.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 540 }}>
                    <input className="input" placeholder="Street address"
                      value={address.street} onChange={e => setAddress({...address, street: e.target.value})}/>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input className="input" placeholder="Unit (optional)"
                        value={address.unit} onChange={e => setAddress({...address, unit: e.target.value})}/>
                      <input className="input" placeholder="City"
                        value={address.city} onChange={e => setAddress({...address, city: e.target.value})}/>
                    </div>
                    <input className="input" placeholder="ZIP code" maxLength={5}
                      value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})}/>
                  </div>

                  <div style={{ marginTop: 32, padding: 20, background: 'var(--bone-50)', borderRadius: 12,
                    border: '1px solid var(--ink-100)', maxWidth: 540 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span className="signal-dot"/>
                      <span className="mono-label">Coverage estimate</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                      <div><div className="caption">Primary carrier</div><div style={{ fontWeight: 500 }}>Excellent (-68 dBm)</div></div>
                      <div><div className="caption">Secondary</div><div style={{ fontWeight: 500 }}>Good (-82 dBm)</div></div>
                      <div><div className="caption">Verdict</div><div style={{ fontWeight: 500, color: 'oklch(0.55 0.15 155)' }}>Qualifies</div></div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="headline" style={{ margin: 0, marginBottom: 8 }}>Schedule install</h2>
                  <p className="body" style={{ color: 'var(--ink-400)', marginBottom: 32 }}>
                    A FastNet engineer will be on site for 60–120 minutes.
                  </p>

                  <div className="mono-label" style={{ marginBottom: 12 }}>Target week</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 32, flexWrap: 'wrap' }}>
                    {[
                      ['this-week', 'This week', '+$250 expedited'],
                      ['next-week', 'Next week', 'No charge'],
                      ['two-weeks', 'In 2 weeks', 'No charge'],
                      ['flexible', 'Flexible', 'No charge'],
                    ].map(o => (
                      <button key={o[0]} onClick={() => setInstall({...install, date: o[0]})}
                        style={{
                          padding: '16px 20px', borderRadius: 12,
                          border: `1.5px solid ${install.date === o[0] ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                          background: 'var(--bone-50)', textAlign: 'left',
                        }}>
                        <div style={{ fontWeight: 500 }}>{o[1]}</div>
                        <div className="caption" style={{ marginTop: 4 }}>{o[2]}</div>
                      </button>
                    ))}
                  </div>

                  <div className="mono-label" style={{ marginBottom: 12 }}>Window</div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
                    {['morning', 'afternoon', 'evening'].map(w => (
                      <button key={w} onClick={() => setInstall({...install, window: w})}
                        style={{
                          padding: '14px 24px', borderRadius: 999,
                          border: `1.5px solid ${install.window === w ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                          background: install.window === w ? 'var(--ink-900)' : 'var(--bone-50)',
                          color: install.window === w ? 'var(--bone-100)' : 'var(--ink-900)',
                          textTransform: 'capitalize', fontSize: 14,
                        }}>
                        {w}
                      </button>
                    ))}
                  </div>

                  <div className="mono-label" style={{ marginBottom: 12 }}>On-site contact</div>
                  <input className="input" placeholder="Phone number"
                    style={{ maxWidth: 340 }}
                    value={install.contact} onChange={e => setInstall({...install, contact: e.target.value})}/>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="headline" style={{ margin: 0, marginBottom: 8 }}>Payment</h2>
                  <p className="body" style={{ color: 'var(--ink-400)', marginBottom: 32 }}>
                    First charge on install day. No authorization hold.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 540 }}>
                    <input className="input" placeholder="Full name"
                      value={payment.name} onChange={e => setPayment({...payment, name: e.target.value})}/>
                    <input className="input" placeholder="Email for invoices"
                      value={payment.email} onChange={e => setPayment({...payment, email: e.target.value})}/>
                    <input className="input" placeholder="Card number"
                      value={payment.card} onChange={e => setPayment({...payment, card: e.target.value})}/>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <input className="input" placeholder="MM / YY"/>
                      <input className="input" placeholder="CVC"/>
                    </div>
                  </div>

                  <div className="mono-sm" style={{ marginTop: 20, color: 'var(--ink-400)' }}>
                    🔒 Secured by Stripe. We never store card numbers.
                  </div>
                </div>
              )}

              {step === 5 && (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'var(--signal)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 0 40px var(--signal-soft)',
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24">
                      <path d="M4 12 L10 18 L20 6" stroke="var(--ink-900)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="headline" style={{ margin: 0 }}>You're booked.</h2>
                  <p className="body-lg" style={{ color: 'var(--ink-400)', marginTop: 16, maxWidth: '42ch', margin: '16px auto 0' }}>
                    Order <span className="mono-sm" style={{ color: 'var(--ink-900)' }}>#FN-2026-04821</span>.
                    A FastNet engineer will call within 24 hours to confirm your install window.
                  </p>
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 40 }}>
                    <button className="btn btn-primary" onClick={() => go('dashboard')}>
                      Preview your dashboard <Arrow size={12}/>
                    </button>
                    <button className="btn btn-ghost" onClick={() => { setStep(1); go('home'); }}>
                      Back to site
                    </button>
                  </div>
                </div>
              )}

              {/* Nav buttons */}
              {step < 5 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48,
                  paddingTop: 32, borderTop: '1px solid var(--ink-100)' }}>
                  <button className="btn btn-ghost" onClick={() => step === 1 ? go('pricing') : setStep(step - 1)}>
                    {step === 1 ? 'Back to pricing' : 'Back'}
                  </button>
                  <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                    {step === 4 ? 'Place order' : 'Continue'} <Arrow size={12}/>
                  </button>
                </div>
              )}
            </div>

            {/* Order summary */}
            {step < 5 && (
              <aside style={{
                padding: 32,
                background: 'var(--ink-900)',
                color: 'var(--bone-100)',
                borderRadius: 18,
                height: 'fit-content',
                position: 'sticky', top: 100,
              }}>
                <div className="mono-label" style={{ color: 'var(--signal)', marginBottom: 20 }}>Order summary</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16,
                  borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 500 }}>{plan.name}</div>
                    <div className="caption" style={{ color: 'var(--ink-300)', marginTop: 4 }}>{plan.tagline}</div>
                  </div>
                  <div style={{ fontWeight: 500 }}>${plan.price}</div>
                </div>

                {addonList.map(a => addons[a.key] && (
                  <div key={a.key} style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16,
                    fontSize: 14, color: 'var(--ink-200)' }}>
                    <span>{a.label}</span>
                    <span>+${a.price}</span>
                  </div>
                ))}

                <div style={{ paddingTop: 20, marginTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 15 }}>Monthly total</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 44 }}>${monthly}</span>
                  </div>
                  <div className="mono-sm" style={{ color: 'var(--ink-400)', marginTop: 4, textAlign: 'right' }}>
                    + $0 hardware · $0 install
                  </div>
                </div>

                <div style={{ marginTop: 24, padding: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 10 }}>
                  <div className="mono-sm" style={{ color: 'var(--ink-200)' }}>
                    ✓ Hardware installed<br/>
                    ✓ 24/7 NOC monitoring<br/>
                    ✓ 30-day satisfaction guarantee
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

window.Checkout = Checkout;
