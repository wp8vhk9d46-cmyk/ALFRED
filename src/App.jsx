import { useState, useEffect, useRef } from 'react'

function useScrollReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

const ACCENT = '#0A1628'

const FEATURES = [
  {
    title: 'Always-On Agent',
    description: 'Runs quietly in the background, watching your workflow and stepping in only when it matters.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Task Automation',
    description: 'Detects repetitive patterns and automates them — file moves, scheduling, formatting, follow-ups.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M4 12h4l3-9 4 18 3-9h4" />
      </svg>
    ),
  },
  {
    title: 'Behavioral Learning',
    description: 'Adapts to how you work over time. No cloud sync — your habits stay on your machine.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path d="M12 2a7 7 0 0 1 7 7c0 3-2 5.5-4 7l-3 4-3-4c-2-1.5-4-4-4-7a7 7 0 0 1 7-7z" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
  },
  {
    title: 'Productivity Insights',
    description: 'Clean, private dashboards showing where your time goes and how to reclaim it.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <rect x="3" y="10" width="4" height="10" rx="1" />
        <rect x="10" y="6" width="4" height="14" rx="1" />
        <rect x="17" y="2" width="4" height="18" rx="1" />
      </svg>
    ),
  },
]

const STEPS = [
  { number: '01', title: 'Install Locally', description: 'One command. Runs on your machine — no cloud, no accounts, no data leaves your device.' },
  { number: '02', title: 'Alfred Observes', description: 'Watches your patterns silently. Learns what you do, when, and how — then suggests automations.' },
  { number: '03', title: 'You Focus', description: 'Small tasks vanish. Repetitive work disappears. You spend time on what actually matters.' },
]

const SOCIAL_ICONS = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
}

const CREATORS = [
  {
    name: 'Carlton King',
    role: 'Co-Founder',
    photo: '/Carlton.png',
    socials: {
      linkedin: 'https://www.linkedin.com/in/carlton-king/',
      x: 'https://x.com/CarltonKing01',
      github: 'https://github.com/wp8vhk9d46-cmyk',
    },
  },
  {
    name: 'Rohan Ramdhani',
    role: 'Co-Founder',
    photo: '/Rohan.png',
    socials: {
      github: 'https://github.com/Rosvawe12',
    },
  },
]

const NAV_LINKS = ['Features', 'How It Works', 'About']

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="cursor-pointer">
            <img src="/Logo2.png" alt="Alfred" className="h-24 w-24 object-contain" />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, '-'))}
                className="text-sm font-light tracking-wide text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => scrollTo('hero')}
              className="text-sm font-medium px-5 py-2 rounded-full text-white cursor-pointer transition-opacity hover:opacity-85"
              style={{ backgroundColor: ACCENT }}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-px bg-white/80 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-5 h-px bg-white/80 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-black border-t border-white/10 px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, '-'))}
                className="text-sm font-light text-white/50 text-left cursor-pointer"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-16 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: [
              'radial-gradient(circle at 50% 43%, rgba(112,178,240,0.48) 0%, rgba(72,135,205,0.34) 18%, rgba(34,86,145,0.24) 38%, rgba(14,42,78,0.14) 56%, transparent 76%)',
              'radial-gradient(ellipse 66% 52% at 50% 46%, rgba(14,42,76,0.74) 0%, rgba(10,28,54,0.46) 44%, rgba(5,14,28,0.18) 66%, transparent 84%)',
              'radial-gradient(ellipse 92% 70% at 50% 54%, rgba(3,9,18,0.36) 0%, transparent 72%)',
            ].join(', '),
          }}
        />
        <div className="relative z-10 max-w-3xl text-center">
          <RevealSection>
            <img src="/Logo2.png" alt="Alfred" className="h-[36rem] w-[36rem] mx-auto -mb-6 object-contain" />
          </RevealSection>
          <RevealSection delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.08]">
              Your computer,<br />working for you.
            </h1>
          </RevealSection>
          <RevealSection delay={0.2}>
            <p className="mt-6 text-lg md:text-xl font-light text-white/55 max-w-xl mx-auto leading-relaxed">
              Alfred is a personal AI that runs locally, watches your workflow, automates the small stuff, and helps you focus on what matters.
            </p>
          </RevealSection>
          <RevealSection delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3.5 rounded-full text-white font-medium text-sm tracking-wide cursor-pointer transition-opacity hover:opacity-85"
                style={{ backgroundColor: ACCENT }}
              >
                Download for Mac
              </button>
              <button
                onClick={() => scrollTo('how-it-works')}
                className="px-8 py-3.5 rounded-full border border-white/15 text-sm font-medium tracking-wide cursor-pointer hover:border-white/30 transition-colors"
              >
                See How It Works
              </button>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Less busywork. More deep work.
              </h2>
              <p className="mt-4 text-white/55 font-light text-lg max-w-lg mx-auto">
                Four capabilities that make Alfred feel like a quiet, competent assistant.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <RevealSection key={f.title} delay={i * 0.1}>
                <div className="border border-white/[0.08] rounded-2xl p-8 hover:border-white/20 transition-colors h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-5"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-white/55 font-light leading-relaxed">{f.description}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-32 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <RevealSection>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Three steps. Zero friction.
              </h2>
              <p className="mt-4 text-white/55 font-light text-lg max-w-md mx-auto">
                From install to autopilot in minutes.
              </p>
            </div>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-12">
            {STEPS.map((s, i) => (
              <RevealSection key={s.number} delay={i * 0.15}>
                <div className="text-center">
                  <span className="text-5xl font-bold block mb-4 text-white">
                    {s.number}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 text-white/55 font-light leading-relaxed">{s.description}</p>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="hidden md:flex justify-center mt-6">
                    <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-white/15">
                      <path d="M0 6h36m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Meet the Founders
              </h2>
              <p className="mt-4 text-white/55 font-light text-lg max-w-md mx-auto">
                The people behind Alfred.
              </p>
            </div>
          </RevealSection>

          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {CREATORS.map((c, i) => (
              <RevealSection key={c.name} delay={i * 0.15}>
                <div className="border border-white/[0.08] rounded-2xl p-8 text-center hover:border-white/20 transition-colors">
                  {c.photo ? (
                    <img src={c.photo} alt={c.name} className="w-20 h-20 rounded-full mx-auto mb-5 object-cover" />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {c.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <h3 className="text-xl font-semibold tracking-tight">{c.name}</h3>
                  <p className="mt-1 text-white/55 font-light">{c.role}</p>
                  {Object.keys(c.socials).length > 0 && (
                    <div className="flex justify-center gap-4 mt-4">
                      {Object.entries(c.socials).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          {SOCIAL_ICONS[platform]}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.08] py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <img src="/Logo2.png" alt="Alfred" className="h-16 w-16 object-contain" />
          <div className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase().replace(/\s+/g, '-'))}
                className="text-sm font-light text-white/55 hover:text-white transition-colors cursor-pointer"
              >
                {link}
              </button>
            ))}
            <span className="text-sm font-light text-white/20">
              &copy; {new Date().getFullYear()} Alfred
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
