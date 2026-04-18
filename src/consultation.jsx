// FastNet — Consultation scheduler

const Consultation = ({ go }) => {
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', address: '', type: 'residential', sqft: '', need: 'failover', notes: '',
  });
  const [slot, setSlot] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const slots = [
    { day: 'Mon', date: 'Apr 21', times: ['10:00', '13:00', '15:30'] },
    { day: 'Tue', date: 'Apr 22', times: ['09:00', '11:30', '14:00'] },
    { day: 'Wed', date: 'Apr 23', times: ['10:30', '13:30', '16:00'] },
    { day: 'Thu', date: 'Apr 24', times: ['09:30', '12:00', '15:00'] },
    { day: 'Fri', date: 'Apr 25', times: ['10:00', '13:00'] },
  ];

  const pickDay = (d) => {
    setSelectedDay(d.date);
    if (slot && slot.date !== d.date) setSlot(null);
  };

  if (submitted) {
    return (
      <div style={{ background: 'var(--bone-100)', color: 'var(--ink-900)', minHeight: 'calc(100vh - 64px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ textAlign: 'center', maxWidth: 540 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--ink-900)', color: 'var(--signal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path d="M4 12 L10 18 L20 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="display-2" style={{ margin: 0, fontSize: 56 }}>Consultation booked.</h1>
          <p className="body-lg" style={{ color: 'var(--ink-400)', marginTop: 20 }}>
            {form.name || 'You'}, you're on the calendar for{' '}
            <span style={{ color: 'var(--ink-900)', fontWeight: 500 }}>{slot?.day} {slot?.date} at {slot?.time}</span>.
            A confirmation is on its way to {form.email || 'your inbox'}.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 32 }}>
            <button className="btn btn-primary" onClick={() => go('home')}>Back to site</button>
            <button className="btn btn-ghost" onClick={() => go('availability')}>Check availability meanwhile</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bone-100)', color: 'var(--ink-900)' }}>
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <SectionTag number="Consult">Talk to an engineer</SectionTag>
          <h1 className="display-2" style={{ margin: 0, maxWidth: '18ch', marginBottom: 56 }}>
            A 30-minute call. No pitch — just whether we can help.
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64 }}>
            {/* Calendar */}
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Pick a slot</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 24 }}>
                {slots.map(d => {
                  const active = selectedDay === d.date;
                  return (
                    <button
                      key={d.date}
                      type="button"
                      onClick={() => pickDay(d)}
                      style={{
                        textAlign: 'center',
                        padding: '14px 0',
                        background: active ? 'var(--ink-900)' : 'var(--bone-50)',
                        color: active ? 'var(--bone-100)' : 'var(--ink-900)',
                        border: `1px solid ${active ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                        borderRadius: 10,
                        cursor: 'pointer',
                        transition: 'all .15s',
                      }}>
                      <div className="mono-label" style={{ color: active ? 'var(--signal)' : undefined }}>{d.day}</div>
                      <div style={{ fontSize: 13, marginTop: 4, color: active ? 'var(--bone-200)' : 'var(--ink-500)' }}>{d.date}</div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                {slots.map(d => {
                  const dayActive = selectedDay === null || selectedDay === d.date;
                  return (
                    <div key={d.date} style={{ display: 'flex', flexDirection: 'column', gap: 6, opacity: dayActive ? 1 : 0.25, transition: 'opacity .15s' }}>
                      {d.times.map(t => {
                        const selected = slot?.date === d.date && slot?.time === t;
                        const disabled = !dayActive;
                        return (
                          <button key={t}
                            disabled={disabled}
                            onClick={() => { setSelectedDay(d.date); setSlot({ ...d, time: t }); }}
                            style={{
                              padding: '12px 0',
                              borderRadius: 8,
                              fontSize: 13,
                              fontFamily: 'var(--font-mono)',
                              letterSpacing: '0.02em',
                              background: selected ? 'var(--ink-900)' : 'var(--bone-50)',
                              color: selected ? 'var(--signal)' : 'var(--ink-900)',
                              border: `1px solid ${selected ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                              cursor: disabled ? 'not-allowed' : 'pointer',
                              transition: 'all .15s',
                            }}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {selectedDay && (
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--ink-400)' }}>
                  <button type="button" onClick={() => setSelectedDay(null)}
                    style={{ fontSize: 12, color: 'var(--ink-500)', textDecoration: 'underline', cursor: 'pointer' }}>
                    Show all days
                  </button>
                </div>
              )}

              <div style={{ marginTop: 32, padding: 20, background: 'var(--bone-50)',
                borderRadius: 10, border: '1px solid var(--ink-100)' }}>
                <div className="mono-label">What to expect</div>
                <ul style={{ marginTop: 12, paddingLeft: 18, fontSize: 14, lineHeight: 1.7, color: 'var(--ink-500)' }}>
                  <li>15 minutes on your environment</li>
                  <li>10 minutes on a proposed plan</li>
                  <li>5 minutes of questions</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Your details</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <input className="input" placeholder="Full name"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                  <input className="input" placeholder="Phone"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}/>
                </div>
                <input className="input" placeholder="Email"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                <input className="input" placeholder="Address or neighborhood"
                  value={form.address} onChange={e => setForm({...form, address: e.target.value})}/>

                <div className="mono-label" style={{ marginTop: 12 }}>Property type</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['residential', 'business', 'multi-site'].map(t => (
                    <button key={t} onClick={() => setForm({...form, type: t})}
                      style={{
                        padding: '10px 18px', borderRadius: 999, fontSize: 13,
                        border: `1.5px solid ${form.type === t ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                        background: form.type === t ? 'var(--ink-900)' : 'var(--bone-50)',
                        color: form.type === t ? 'var(--bone-100)' : 'var(--ink-900)',
                        textTransform: 'capitalize',
                      }}>{t}</button>
                  ))}
                </div>

                <div className="mono-label" style={{ marginTop: 12 }}>What do you need</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[['failover', 'Failover'], ['primary', 'Primary'], ['not-sure', 'Not sure yet']].map(t => (
                    <button key={t[0]} onClick={() => setForm({...form, need: t[0]})}
                      style={{
                        padding: '10px 18px', borderRadius: 999, fontSize: 13,
                        border: `1.5px solid ${form.need === t[0] ? 'var(--ink-900)' : 'var(--ink-100)'}`,
                        background: form.need === t[0] ? 'var(--ink-900)' : 'var(--bone-50)',
                        color: form.need === t[0] ? 'var(--bone-100)' : 'var(--ink-900)',
                      }}>{t[1]}</button>
                  ))}
                </div>

                <textarea className="input" placeholder="Anything else we should know? (current ISP, integrations, concerns…)"
                  rows={4}
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}/>
              </div>

              <button
                onClick={() => slot && form.email && setSubmitted(true)}
                disabled={!slot || !form.email}
                className="btn btn-lg btn-primary"
                style={{ marginTop: 24, width: '100%', opacity: (!slot || !form.email) ? 0.4 : 1 }}>
                {slot ? `Book ${slot.day} ${slot.date} · ${slot.time}` : 'Pick a slot to continue'} <Arrow size={14}/>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

window.Consultation = Consultation;
