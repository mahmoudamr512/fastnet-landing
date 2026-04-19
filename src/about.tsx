import { SectionTag, Arrow, type GoFn } from './primitives';

const SOCIAL_LINKS = [
  { label: 'Upwork',   url: 'https://www.upwork.com/freelancers/mahmouda299',  handle: 'mahmouda299' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mahmoud-a-46818913b/', handle: 'mahmoud-a' },
  { label: 'GitHub',   url: 'https://github.com/mahmoudamr512',                 handle: 'mahmoudamr512' },
  { label: 'Email',    url: 'mailto:contact@mahmoudamr.dev',                    handle: 'contact@mahmoudamr.dev' },
];

const STACK = [
  ['Frontend',     'React · Next.js · TypeScript · Tailwind · Vite · esbuild'],
  ['Backend',      'Node · Java · PostgreSQL · REST/GraphQL · serverless'],
  ['AI & automation', 'Anthropic + OpenAI APIs · n8n · Zapier · custom agents · MCP servers'],
  ['Cloud',        'Vercel · AWS · GCP · Docker · CI/CD'],
  ['Design ops',   'Figma → production · design systems · motion · accessibility'],
];

export const About = ({ go }: { go: GoFn }) => (
  <div className="bg-bone-100 text-ink-900">
    <section className="pt-20 pb-12 md:pt-30 md:pb-20 bg-ink-900 text-bone-100 relative overflow-hidden">
      <div className="absolute top-1/2 -right-[10%] -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 60%)' }}/>
      <div className="container-app relative">
        <SectionTag number="About">The maker</SectionTag>

        <div className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-14 items-center">
          <div className="relative">
            <div className="absolute -inset-2 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 70%)' }}/>
            <img
              src="/mahmoud.jpg"
              alt="Mahmoud Amr — Senior Software Engineer, freelance full-stack & AI / automation specialist based in Cairo"
              width="280" height="280"
              className="relative w-44 h-44 md:w-[280px] md:h-[280px] rounded-full object-cover
                         border-2 border-white/[0.12] shadow-2xl"
              itemProp="image"
            />
          </div>

          <div>
            <h1 className="display-1 m-0" itemProp="name">
              Mahmoud <span className="italic text-signal">Amr.</span>
            </h1>
            <div className="mono-label text-signal mt-4" itemProp="jobTitle">
              Senior Software Engineer · Full-Stack · AI &amp; Automation
            </div>
            <p className="body-lg text-ink-200 mt-4 max-w-[58ch]">
              Independent engineer based in <span itemProp="addressLocality">Cairo</span> —
              freelancing since 2016. I build polished, conversion-focused web apps and ship
              custom automations + AI agents for startups, design studios, and small teams.
              This site — FastNet — is one of those builds, end to end.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          {SOCIAL_LINKS.map(s => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer me"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.06]
                         border border-white/[0.12] hover:bg-white/[0.1] transition-colors
                         font-mono text-[12px] tracking-wider uppercase">
              <span className="text-signal">{s.label}</span>
              <span className="text-ink-300">·</span>
              <span>{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container-app grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
        <div>
          <SectionTag number="01">What I do</SectionTag>
          <h2 className="title m-0 max-w-[18ch]">
            Ship polished frontend that earns its place in the product.
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <p className="body-lg text-ink-500 m-0">
            I work end-to-end on web products: design system in code, responsive layouts,
            interactive demos, motion, accessibility, performance budgets, and the boring
            infrastructure (build pipelines, CDN caching, deploy automation) that makes the
            polish hold up after launch.
          </p>
          <p className="body text-ink-500 m-0">
            I take handoffs from designers and AI prototyping tools, then turn them into
            production code that doesn't look like AI wrote it. I also build internal AI
            agents, n8n / Zapier workflows, and Anthropic + OpenAI integrations for teams
            that want their tooling to compound.
          </p>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-bone-50 border-y border-ink-100">
      <div className="container-app">
        <SectionTag number="02">Stack</SectionTag>
        <div className="grid md:grid-cols-2 gap-px bg-ink-100 border border-ink-100">
          {STACK.map(([area, list]) => (
            <div key={area} className="bg-bone-50 p-7">
              <div className="mono-label text-[var(--color-signal-dim)] mb-3">{area}</div>
              <div className="text-base text-ink-800">{list}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24">
      <div className="container-app">
        <SectionTag number="03">This project</SectionTag>
        <h2 className="headline m-0 max-w-[20ch]">
          FastNet is a fictional brand. Everything else is real.
        </h2>
        <p className="body-lg text-ink-500 mt-6 max-w-[56ch]">
          Custom React 18 SPA, Tailwind v4 design system, mobile-first, eight navigable views,
          interactive failover demo, multi-step checkout, ZIP coverage check, calendar booking,
          live customer dashboard preview. Bundled with esbuild, deployed to Vercel as static assets.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <a href="https://github.com/mahmoudamr512/fastnet-landing" target="_blank" rel="noopener noreferrer"
             className="btn btn-primary">View source on GitHub <Arrow size={12}/></a>
          <button className="btn btn-ghost" onClick={() => go('home')}>Back to FastNet</button>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-ink-900 text-bone-100 relative overflow-hidden">
      <div className="absolute top-1/2 -left-[10%] -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-signal-soft) 0%, transparent 60%)' }}/>
      <div className="container-app relative">
        <SectionTag number="04">Hire me</SectionTag>
        <h2 className="display-2 m-0 max-w-[20ch]">
          Need a site like this? <span className="italic text-signal">Let's talk.</span>
        </h2>
        <p className="body-lg text-ink-200 mt-6 max-w-[50ch]">
          Available through Upwork or direct. Response within 24 hours, Cairo timezone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-10">
          <a href="https://www.upwork.com/freelancers/mahmouda299" target="_blank" rel="noopener noreferrer"
             className="btn btn-lg btn-signal">Hire Mahmoud Amr on Upwork <Arrow size={14}/></a>
          <a href="mailto:contact@mahmoudamr.dev" className="btn btn-lg btn-ghost">Email Mahmoud</a>
        </div>
      </div>
    </section>
  </div>
);

