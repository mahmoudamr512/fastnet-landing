// FastNet — Consultation scheduler

const SLOTS = [
  { day: 'Mon', date: 'Apr 21', times: ['10:00', '13:00', '15:30'] },
  { day: 'Tue', date: 'Apr 22', times: ['09:00', '11:30', '14:00'] },
  { day: 'Wed', date: 'Apr 23', times: ['10:30', '13:30', '16:00'] },
  { day: 'Thu', date: 'Apr 24', times: ['09:30', '12:00', '15:00'] },
  { day: 'Fri', date: 'Apr 25', times: ['10:00', '13:00'] },
];

const Consultation = ({ go }) => {
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', address: '', type: 'residential', sqft: '', need: 'failover', notes: '',
  });
  const [slot, setSlot] = React.useState(null);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);

  const pickDay = (d) => {
    setSelectedDay(d.date);
    if (slot && slot.date !== d.date) setSlot(null);
  };

  if (submitted) {
    return (
      <div className="bg-bone-100 text-ink-900 min-h-[calc(100vh-64px)] flex items-center justify-center p-10">
        <div className="text-center max-w-[540px]">
          <div className="w-18 h-18 rounded-full bg-ink-900 text-signal flex items-center justify-center mx-auto mb-6"
            style={{ width: 72, height: 72 }}>
            <svg width="32" height="32" viewBox="0 0 24 24">
              <path d="M4 12 L10 18 L20 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="display-2 m-0 text-[44px] md:text-[56px]">Consultation booked.</h1>
          <p className="body-lg text-ink-400 mt-5">
            {form.name || 'You'}, you're on the calendar for{' '}
            <span className="text-ink-900 font-medium">{slot?.day} {slot?.date} at {slot?.time}</span>.
            A confirmation is on its way to {form.email || 'your inbox'}.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 justify-center mt-8">
            <button className="btn btn-primary" onClick={() => go('home')}>Back to site</button>
            <button className="btn btn-ghost" onClick={() => go('availability')}>Check availability meanwhile</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bone-100 text-ink-900">
      <section className="py-14 md:py-20">
        <div className="container-app">
          <SectionTag number="Consult">Talk to an engineer</SectionTag>
          <h1 className="display-2 m-0 max-w-[18ch] mb-12 md:mb-14">
            A 30-minute call. No pitch — just whether we can help.
          </h1>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16">
            <div>
              <h3 className="text-[15px] font-medium mb-4">Pick a slot</h3>

              <div className="grid grid-cols-5 gap-2 mb-6">
                {SLOTS.map(d => {
                  const active = selectedDay === d.date;
                  return (
                    <button key={d.date} onClick={() => pickDay(d)} className={cn(
                      'text-center py-3.5 rounded-[10px] border transition-all',
                      active
                        ? 'bg-ink-900 text-bone-100 border-ink-900'
                        : 'bg-bone-50 text-ink-900 border-ink-100'
                    )}>
                      <div className={cn('mono-label', active && 'text-signal')}>{d.day}</div>
                      <div className={cn('text-[13px] mt-1', active ? 'text-bone-200' : 'text-ink-500')}>{d.date}</div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-5 gap-2">
                {SLOTS.map(d => {
                  const dayActive = selectedDay === null || selectedDay === d.date;
                  return (
                    <div key={d.date} className={cn('flex flex-col gap-1.5 transition-opacity', !dayActive && 'opacity-25')}>
                      {d.times.map(t => {
                        const selected = slot?.date === d.date && slot?.time === t;
                        return (
                          <button key={t} disabled={!dayActive}
                            onClick={() => { setSelectedDay(d.date); setSlot({ ...d, time: t }); }}
                            className={cn(
                              'py-3 rounded-lg text-[13px] font-mono tracking-wide border transition-all',
                              selected ? 'bg-ink-900 text-signal border-ink-900' : 'bg-bone-50 text-ink-900 border-ink-100',
                              !dayActive && 'cursor-not-allowed'
                            )}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {selectedDay && (
                <div className="mt-3 text-xs text-ink-400">
                  <button onClick={() => setSelectedDay(null)} className="text-xs text-ink-500 underline cursor-pointer">
                    Show all days
                  </button>
                </div>
              )}

              <div className="mt-8 p-5 bg-bone-50 rounded-[10px] border border-ink-100">
                <div className="mono-label">What to expect</div>
                <ul className="mt-3 pl-4.5 text-sm leading-7 text-ink-500 list-disc">
                  <li>15 minutes on your environment</li>
                  <li>10 minutes on a proposed plan</li>
                  <li>5 minutes of questions</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-[15px] font-medium mb-4">Your details</h3>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <input className="input" placeholder="Full name"
                    value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
                  <input className="input" placeholder="Phone"
                    value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}/>
                </div>
                <input className="input" placeholder="Email"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
                <input className="input" placeholder="Address or neighborhood"
                  value={form.address} onChange={e => setForm({...form, address: e.target.value})}/>

                <div className="mono-label mt-3">Property type</div>
                <div className="flex flex-wrap gap-2">
                  {['residential', 'business', 'multi-site'].map(t => (
                    <button key={t} onClick={() => setForm({...form, type: t})} className={cn(
                      'px-4.5 py-2.5 rounded-full text-[13px] capitalize',
                      form.type === t
                        ? 'border-[1.5px] border-ink-900 bg-ink-900 text-bone-100'
                        : 'border-[1.5px] border-ink-100 bg-bone-50 text-ink-900'
                    )}>{t}</button>
                  ))}
                </div>

                <div className="mono-label mt-3">What do you need</div>
                <div className="flex flex-wrap gap-2">
                  {[['failover', 'Failover'], ['primary', 'Primary'], ['not-sure', 'Not sure yet']].map(t => (
                    <button key={t[0]} onClick={() => setForm({...form, need: t[0]})} className={cn(
                      'px-4.5 py-2.5 rounded-full text-[13px]',
                      form.need === t[0]
                        ? 'border-[1.5px] border-ink-900 bg-ink-900 text-bone-100'
                        : 'border-[1.5px] border-ink-100 bg-bone-50 text-ink-900'
                    )}>{t[1]}</button>
                  ))}
                </div>

                <textarea className="input" rows={4}
                  placeholder="Anything else we should know? (current ISP, integrations, concerns…)"
                  value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}/>
              </div>

              <button
                onClick={() => slot && form.email && setSubmitted(true)}
                disabled={!slot || !form.email}
                className={cn('btn btn-lg btn-primary mt-6 w-full', (!slot || !form.email) && 'opacity-40')}>
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
