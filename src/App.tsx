import { useEffect, useRef, useState } from "react"

import imgSypialniePoddasze from "./assets/portfolio/sypialnia-poddasze.jpg"
import imgLazienkiPrysznic from "./assets/portfolio/lazienka-prysznic.jpg"
import imgWiataMagazynek from "./assets/portfolio/wiata-magazynek.jpg"
import imgWiataPodjazd from "./assets/portfolio/wiata-podjazd.jpg"
import imgLazienkiCzarna from "./assets/portfolio/lazienka-czarna.jpg"
import imgSypialnieCzarna from "./assets/portfolio/sypialnia-czarna.jpg"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV = [
  { label: "Usługi", href: "#uslugi" },
  { label: "Proces", href: "#proces" },
  { label: "Realizacje", href: "#realizacje" },
  { label: "O mnie", href: "#o-mnie" },
  { label: "Kontakt", href: "#kontakt" },
]

const SERVICES = [
  {
    n: "01",
    title: "Remonty generalne",
    desc: "Kompleksowa realizacja remontów mieszkań, domów i lokali — od demontażu po gotowe wnętrze.",
    img: "https://images.unsplash.com/photo-1761330439671-a7f20c285c5e?w=900&h=1100&fit=crop&auto=format",
  },
  {
    n: "02",
    title: "Prace wykończeniowe",
    desc: "Precyzyjne wykonanie elementów wykończenia wnętrz z dbałością o każdy detal.",
    img: "https://images.unsplash.com/photo-1737898378296-94dc316cd443?w=900&h=1100&fit=crop&auto=format",
  },
  {
    n: "03",
    title: "Gładzie i tynki",
    desc: "Dokładne przygotowanie ścian i powierzchni pod idealnie równe wykończenie.",
    img: "https://images.unsplash.com/photo-1751486403890-793880b12adb?w=900&h=1100&fit=crop&auto=format",
  },
  {
    n: "04",
    title: "Malowanie ścian",
    desc: "Przygotowanie powierzchni, gruntowanie i malowanie z równymi krawędziami.",
    img: "https://images.unsplash.com/photo-1707725669525-d925dc9e9010?w=900&h=1100&fit=crop&auto=format",
  },
  {
    n: "05",
    title: "Glazurnictwo",
    desc: "Układanie płytek oraz kompleksowe przygotowanie powierzchni w łazienkach i kuchniach.",
    img: "https://images.unsplash.com/photo-1756079664354-34944e001f6d?w=900&h=1100&fit=crop&auto=format",
  },
]

const PROCESS = [
  { n: "01", title: "Kontakt", desc: "Pierwsza rozmowa i poznanie zakresu planowanych prac." },
  { n: "02", title: "Oględziny", desc: "Ocena pomieszczeń oraz ustalenie realnego zakresu realizacji." },
  { n: "03", title: "Wycena", desc: "Przygotowanie indywidualnej, transparentnej wyceny." },
  { n: "04", title: "Planowanie", desc: "Ustalenie harmonogramu, materiałów i etapów prac." },
  { n: "05", title: "Realizacja", desc: "Profesjonalne wykonanie prac z bieżącą komunikacją." },
  { n: "06", title: "Odbiór", desc: "Finalna kontrola jakości i przekazanie gotowej realizacji." },
]

const PROJECTS = [
  {
    title: "Sypialnie",
    img: imgSypialniePoddasze,
    span: "lg:col-span-7",
    ratio: "aspect-[7/5]",
  },
  {
    title: "Łazienki",
    img: imgLazienkiPrysznic,
    span: "lg:col-span-5",
    ratio: "aspect-[3/4]",
  },
  {
    title: "Wiata",
    img: imgWiataMagazynek,
    span: "lg:col-span-5",
    ratio: "aspect-[3/4]",
  },
  {
    title: "Wiata",
    img: imgWiataPodjazd,
    span: "lg:col-span-7",
    ratio: "aspect-[7/5]",
  },
  {
    title: "Łazienki",
    img: imgLazienkiCzarna,
    span: "lg:col-span-6",
    ratio: "aspect-[4/5]",
  },
  {
    title: "Sypialnie",
    img: imgSypialnieCzarna,
    span: "lg:col-span-6",
    ratio: "aspect-[4/5]",
  },
]

const STATS = [
  { value: "100+", label: "zrealizowanych wnętrz" },
  { value: "13 lat", label: "doświadczenia w zawodzie" },
  { value: "100%", label: "prac oddanych w terminie" },
]

const VALUES = [
  "Dbałość o szczegóły",
  "Terminowość",
  "Jakość wykonania",
  "Indywidualne podejście",
  "Transparentna komunikacja",
  "Praca bez pośredników",
]

/* ------------------------------------------------------------------ */
/*  Reveal hook                                                        */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"))
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ------------------------------------------------------------------ */
/*  Small primitives                                                   */
/* ------------------------------------------------------------------ */

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--clay)]">
      {children}
    </span>
  )
}

function CTA({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string
  children: React.ReactNode
  variant?: "solid" | "ghost"
  className?: string
}) {
  const base =
    "group inline-flex items-center gap-3 px-7 py-3.5 text-sm tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--clay)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--stone-50)]"
  const styles =
    variant === "solid"
      ? "bg-[var(--ink)] text-[var(--stone-50)] hover:bg-[var(--clay)]"
      : "border border-[var(--border)] text-[var(--ink)] hover:border-[var(--ink)]"
  return (
    <a href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  )
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[var(--stone-50)]/85 backdrop-blur-md border-b border-[var(--border)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-tight text-[var(--ink)]">
            P. Słomczyński
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
            Remonty · Wykończenia
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--clay)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+48661407147"
            className="hidden font-mono text-xs tracking-wide text-[var(--ink)] hover:text-[var(--clay)] md:block"
          >
            +48 661 407 147
          </a>
          <a
            href="#kontakt"
            className="hidden bg-[var(--ink)] px-5 py-2.5 text-xs uppercase tracking-[0.14em] text-[var(--stone-50)] transition-colors hover:bg-[var(--clay)] md:inline-block"
          >
            Zapytaj o wycenę
          </a>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-px w-6 bg-[var(--ink)] transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span className={`block h-px w-6 bg-[var(--ink)] transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-px w-6 bg-[var(--ink)] transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-[var(--border)] bg-[var(--stone-50)] transition-[max-height] duration-500 lg:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-[var(--border)] py-4 font-display text-2xl text-[var(--ink)]"
            >
              {item.label}
              <span className="font-mono text-xs text-[var(--muted-foreground)]">→</span>
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const [y, setY] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setY(window.scrollY))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[var(--graphite)]">
      <img
        src="https://images.unsplash.com/photo-1772475385317-09f9ef320474?w=2000&h=2400&fit=crop&auto=format"
        alt="Nowoczesne wnętrze po kompleksowym wykończeniu"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `translateY(${y * 0.18}px) scale(1.08)` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--graphite)] via-[var(--graphite)]/45 to-[var(--graphite)]/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--graphite)]/70 to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-20">
        <div className="mb-auto pt-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--stone-200)]/80">
            Rzemiosło wnętrz · od 2013
          </span>
        </div>

        <div className="max-w-5xl">
          <h1 className="font-display text-[clamp(2.75rem,11vw,9.5rem)] font-light leading-[0.92] tracking-[-0.02em] text-[var(--stone-50)]">
            Remonty i prace
            <br />
            <span className="italic text-[var(--stone-200)]">wykończeniowe</span>
          </h1>

          <div className="mt-8 flex flex-col gap-6 border-t border-[var(--stone-50)]/20 pt-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--stone-200)]">
                Przemysław Słomczyński
              </p>
              <p className="mt-3 text-base leading-relaxed text-[var(--stone-100)]/85 md:text-lg">
                Wnętrza wykończone z precyzją, w terminie i z dbałością o każdy detal.
                Od pierwszej rozmowy po odbiór gotowej realizacji.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <a
                href="#kontakt"
                className="group inline-flex items-center justify-center gap-3 bg-[var(--stone-50)] px-7 py-4 text-sm tracking-wide text-[var(--ink)] transition-colors hover:bg-[var(--clay)] hover:text-[var(--stone-50)]"
              >
                Zapytaj o wycenę
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#realizacje"
                className="inline-flex items-center justify-center gap-3 border border-[var(--stone-50)]/30 px-7 py-4 text-sm tracking-wide text-[var(--stone-50)] transition-colors hover:border-[var(--stone-50)]"
              >
                Zobacz realizacje
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 hidden items-center gap-3 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--stone-200)]/70">
            Przewiń
          </span>
          <span className="relative block h-10 w-px overflow-hidden bg-[var(--stone-50)]/20">
            <span className="absolute inset-x-0 top-0 h-4 animate-[scrolldot_1.8s_ease-in-out_infinite] bg-[var(--clay)]" />
          </span>
        </div>
      </div>

      <style>{`@keyframes scrolldot{0%{transform:translateY(-100%)}60%,100%{transform:translateY(250%)}}`}</style>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Marquee band                                                       */
/* ------------------------------------------------------------------ */

function Band() {
  const items = ["Jakość", "Precyzja", "Doświadczenie", "Estetyka", "Solidność", "Terminowość", "Zaufanie"]
  return (
    <div className="clip-marquee border-y border-[var(--border)] bg-[var(--stone-100)] py-5">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-10">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic text-[var(--ink-soft)] md:text-3xl">{t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--clay)]" />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-33.33%)}}`}</style>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section heading                                                    */
/* ------------------------------------------------------------------ */

function SectionHead({
  index,
  kicker,
  title,
  intro,
}: {
  index: string
  kicker: string
  title: React.ReactNode
  intro?: string
}) {
  return (
    <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <div className="mb-5 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--muted-foreground)]">{index}</span>
          <span className="h-px w-10 bg-[var(--border)]" />
          <Kicker>{kicker}</Kicker>
        </div>
        <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-[var(--ink)]">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="text-base leading-relaxed text-[var(--muted-foreground)] md:col-span-4">
          {intro}
        </p>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */

function Services() {
  const [active, setActive] = useState(0)
  return (
    <section id="uslugi" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionHead
        index="01"
        kicker="Zakres prac"
        title={
          <>
            Co wykonuję <span className="italic text-[var(--clay)]">na miejscu</span>
          </>
        }
        intro="Kompleksowa realizacja wnętrz — jeden wykonawca odpowiedzialny za całość, od stanu surowego po gotowy detal."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12">
        {/* Image preview — desktop */}
        <div className="reveal hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-[var(--stone-200)]">
            {SERVICES.map((s, i) => (
              <img
                key={s.n}
                src={s.img}
                alt={s.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  active === i ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-7">
          <div className="border-t border-[var(--border)]">
            {SERVICES.map((s, i) => (
              <div
                key={s.n}
                onMouseEnter={() => setActive(i)}
                className="reveal group grid cursor-default grid-cols-[auto_1fr] gap-x-5 border-b border-[var(--border)] py-7 transition-colors hover:bg-[var(--stone-100)] md:gap-x-8"
              >
                <span className="font-mono text-sm text-[var(--clay)]">{s.n}</span>
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-normal text-[var(--ink)] transition-colors group-hover:text-[var(--clay)] md:text-3xl">
                      {s.title}
                    </h3>
                    <span className="hidden shrink-0 font-mono text-xs text-[var(--muted-foreground)] opacity-0 transition-opacity group-hover:opacity-100 md:block">
                      →
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {s.desc}
                  </p>
                  {/* Mobile thumb */}
                  <div className="mt-4 aspect-[16/9] overflow-hidden bg-[var(--stone-200)] lg:hidden">
                    <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Process                                                            */
/* ------------------------------------------------------------------ */

function Process() {
  return (
    <section id="proces" className="bg-[var(--graphite)] py-24 text-[var(--stone-50)] md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <div className="mb-5 flex items-center gap-4">
              <span className="font-mono text-xs text-[var(--stone-200)]/60">02</span>
              <span className="h-px w-10 bg-[var(--stone-50)]/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--clay)]">
                Współpraca
              </span>
            </div>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[0.98] tracking-[-0.02em]">
              Proces krok po kroku
            </h2>
          </div>
          <p className="text-base leading-relaxed text-[var(--stone-200)]/80 md:col-span-4">
            Przejrzysty przebieg od pierwszego kontaktu po odbiór — bez niespodzianek i ukrytych kosztów.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border border-[var(--stone-50)]/12 bg-[var(--stone-50)]/12 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((p) => (
            <li
              key={p.n}
              className="reveal group relative bg-[var(--graphite)] p-8 transition-colors duration-500 hover:bg-[#2a2723] md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-display text-5xl font-light text-[var(--stone-50)]/25 transition-colors group-hover:text-[var(--clay)] md:text-6xl">
                  {p.n}
                </span>
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--clay)] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-normal">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--stone-200)]/70">{p.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */

function Projects() {
  return (
    <section id="realizacje" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionHead
        index="03"
        kicker="Portfolio"
        title={
          <>
            Realizacje, które <span className="italic text-[var(--clay)]">mówią same za siebie</span>
          </>
        }
        intro="Wybrane wnętrza z ostatnich sezonów. Każde oddane w terminie i dopięte w detalu."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <article key={`${p.title}-${i}`} className={`reveal group ${p.span ?? "lg:col-span-6"}`}>
            <div className={`relative overflow-hidden bg-[var(--stone-200)] ${p.ratio}`}>
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--stone-50)]">
                  {p.title}
                </h3>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal mt-12 flex justify-center">
        <CTA href="#kontakt" variant="ghost">
          Porozmawiaj o swojej realizacji
        </CTA>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Stats                                                              */
/* ------------------------------------------------------------------ */

function Stats() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--stone-100)]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-px bg-[var(--border)] sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.label} className="reveal bg-[var(--stone-100)] px-6 py-12 text-center md:py-16">
            <div className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-none tracking-tight text-[var(--ink)]">
              {s.value}
            </div>
            <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="o-mnie" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="reveal lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--stone-200)]">
            <img
              src="https://images.unsplash.com/photo-1751486403890-793880b12adb?w=1000&h=1250&fit=crop&auto=format"
              alt="Przemysław Słomczyński przy pracy wykończeniowej"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-[var(--stone-50)] px-6 py-4">
              <p className="font-display text-lg text-[var(--ink)]">Przemysław Słomczyński</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                Właściciel · wykonawca
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <div className="reveal mb-6 flex items-center gap-4">
            <span className="font-mono text-xs text-[var(--muted-foreground)]">04</span>
            <span className="h-px w-10 bg-[var(--border)]" />
            <Kicker>Dlaczego ja</Kicker>
          </div>
          <h2 className="reveal font-display text-[clamp(1.9rem,5vw,3.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-[var(--ink)]">
            Jeden fachowiec, który bierze odpowiedzialność za całość wnętrza.
          </h2>
          <div className="reveal mt-8 max-w-xl space-y-5 text-base leading-relaxed text-[var(--muted-foreground)]">
            <p>
              Od ponad dekady wykańczam mieszkania i domy — od gładzi i tynków po glazurę i finalne
              detale. Działam sam, bez zespołu, dzięki czemu przez cały czas realizacji osobiście
              odpowiadam za jakość i przebieg każdego etapu prac.
            </p>
            <p>
              Nie ukrywam kosztów, nie zostawiam prac „na później” i sprzątam po sobie każdego dnia.
              Traktuję każde wnętrze tak, jakby było moje własne.
            </p>
          </div>

          <ul className="reveal mt-10 grid gap-px overflow-hidden border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
            {VALUES.map((v) => (
              <li
                key={v}
                className="flex items-center gap-3 bg-[var(--stone-50)] px-5 py-4 text-sm text-[var(--ink)]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--clay)]" />
                {v}
              </li>
            ))}
          </ul>

          <div className="reveal mt-8">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
              Obszar działania — Szczecin i okolice
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const [sent, setSent] = useState(false)
  const field =
    "w-full border-b border-[var(--stone-50)]/25 bg-transparent py-3 text-[var(--stone-50)] placeholder-[var(--stone-200)]/40 transition-colors focus:border-[var(--clay)] focus:outline-none"

  return (
    <section id="kontakt" className="bg-[var(--ink)] py-24 text-[var(--stone-50)] md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="reveal mb-6 flex items-center gap-4">
              <span className="font-mono text-xs text-[var(--stone-200)]/50">05</span>
              <span className="h-px w-10 bg-[var(--stone-50)]/20" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--clay)]">
                Kontakt
              </span>
            </div>
            <h2 className="reveal font-display text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[0.98] tracking-[-0.02em]">
              Porozmawiajmy o Twoim remoncie
            </h2>
            <p className="reveal mt-6 max-w-md text-base leading-relaxed text-[var(--stone-200)]/80">
              Opisz krótko zakres prac — odezwę się z pierwszą oceną i propozycją terminu oględzin.
            </p>

            <div className="reveal mt-10 space-y-1">
              <a
                href="tel:+48661407147"
                className="group flex items-baseline justify-between border-t border-[var(--stone-50)]/15 py-5"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                  Telefon
                </span>
                <span className="font-display text-2xl text-[var(--stone-50)] transition-colors group-hover:text-[var(--clay)]">
                  +48 661 407 147
                </span>
              </a>
              <a
                href="mailto:kontakt@slomczynski.pl"
                className="group flex items-baseline justify-between border-t border-[var(--stone-50)]/15 py-5"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                  E-mail
                </span>
                <span className="font-display text-xl text-[var(--stone-50)] transition-colors group-hover:text-[var(--clay)] md:text-2xl">
                  kontakt@slomczynski.pl
                </span>
              </a>
              <div className="flex items-baseline justify-between border-y border-[var(--stone-50)]/15 py-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                  Obszar
                </span>
                <span className="font-display text-xl text-[var(--stone-50)] md:text-2xl">
                  Szczecin i okolice
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {sent ? (
              <div className="reveal flex h-full min-h-72 flex-col items-start justify-center border border-[var(--stone-50)]/15 p-10">
                <span className="h-2 w-2 rounded-full bg-[var(--clay)]" />
                <h3 className="mt-6 font-display text-3xl font-light">Dziękuję za wiadomość.</h3>
                <p className="mt-3 text-[var(--stone-200)]/75">
                  Odezwę się najszybciej, jak to możliwe — zwykle w ciągu jednego dnia roboczego.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                className="reveal grid gap-8 sm:grid-cols-2"
              >
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                    Imię i nazwisko
                  </span>
                  <input required type="text" placeholder="Jan Kowalski" className={field} />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                    Telefon
                  </span>
                  <input required type="tel" placeholder="+48 ___ ___ ___" className={field} />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                    E-mail
                  </span>
                  <input required type="email" placeholder="jan@example.pl" className={field} />
                </label>
                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                    Rodzaj inwestycji
                  </span>
                  <select required defaultValue="" className={`${field} appearance-none`}>
                    <option value="" disabled className="text-[var(--ink)]">
                      Wybierz…
                    </option>
                    <option className="text-[var(--ink)]">Mieszkanie</option>
                    <option className="text-[var(--ink)]">Dom</option>
                    <option className="text-[var(--ink)]">Lokal usługowy</option>
                    <option className="text-[var(--ink)]">Inne</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--stone-200)]/60">
                    Opisz zakres prac
                  </span>
                  <textarea
                    rows={4}
                    placeholder="Metraż, zakres, planowany termin…"
                    className={`${field} resize-none`}
                  />
                </label>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-3 bg-[var(--clay)] px-8 py-4 text-sm uppercase tracking-[0.14em] text-[var(--stone-50)] transition-colors hover:bg-[var(--stone-50)] hover:text-[var(--ink)] sm:w-auto"
                  >
                    Wyślij zapytanie
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[var(--ink)] pb-10 text-[var(--stone-200)]">
      <div className="mx-auto max-w-[1600px] border-t border-[var(--stone-50)]/12 px-5 pt-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl text-[var(--stone-50)]">Przemysław Słomczyński</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--stone-200)]/60">
              Remonty i prace wykończeniowe
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-4">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm transition-colors hover:text-[var(--clay)]">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="md:col-span-3 md:text-right">
            <a href="tel:+48661407147" className="block text-sm transition-colors hover:text-[var(--clay)]">
              +48 661 407 147
            </a>
            <a
              href="mailto:kontakt@slomczynski.pl"
              className="block text-sm transition-colors hover:text-[var(--clay)]"
            >
              kontakt@slomczynski.pl
            </a>
            <div className="mt-3 flex gap-4 md:justify-end">
              <a
                href="https://www.facebook.com/profile.php?id=100007031791902"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.14em] hover:text-[var(--clay)]"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[var(--stone-50)]/12 pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--stone-200)]/50 sm:flex-row">
          <span>© {new Date().getFullYear()} Przemysław Słomczyński</span>
          <span>Polityka prywatności · Regulamin</span>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating mobile CTA                                                */
/* ------------------------------------------------------------------ */

function FloatingCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-[var(--border)] bg-[var(--border)] lg:hidden">
      <a
        href="tel:+48661407147"
        className="flex items-center justify-center gap-2 bg-[var(--stone-50)] py-4 text-sm font-medium text-[var(--ink)]"
      >
        <span className="text-[var(--clay)]">✆</span> Zadzwoń
      </a>
      <a
        href="#kontakt"
        className="flex items-center justify-center gap-2 bg-[var(--ink)] py-4 text-sm font-medium text-[var(--stone-50)]"
      >
        Zapytaj o wycenę
      </a>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  useReveal()
  return (
    <div className="min-h-full bg-[var(--stone-50)] pb-14 lg:pb-0">
      <Header />
      <main>
        <Hero />
        <Band />
        <Services />
        <Process />
        <Projects />
        <Stats />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
