import { FormEvent, ReactNode, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { changeLocale, i18n, supportedLocales, type Locale } from "./i18n"
import {
  aboutCards,
  featureCards,
  navigationItems,
  plans,
  segments,
  teamMembers,
  visibilityCards,
  type IconName,
} from "./content"

function Icon({ name, size = 20 }: { name: IconName size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    alert: (
      <>
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.3 3.7 2.5 18a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    building: (
      <>
        <path d="M4 21h16M6 21V5l6-2v18M12 8h4l2 2v11" />
        <path d="M9 8v.01M9 12v.01M9 16v.01M15 13v.01M15 17v.01" />
      </>
    ),
    chart: (
      <>
        <path d="M4 19V9M10 19V5M16 19v-7M22 19V2" />
        <path d="M2 19h22" />
      </>
    ),
    check: <path d="m5 12 4 4 10-10" />,
    chevron: <path d="m7 10 5 5 5-5" />,
    drop: (
      <path d="M12 3C9 7 6.5 10 6.5 14a5.5 5.5 0 0 0 11 0C17.5 10 15 7 12 3Z" />
    ),
    facebook: (
      <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" />
    ),
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v11h14V10M9 21v-7h6v7" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    linkedin: (
      <>
        <path d="M6 9v11M6 5v.01M11 20v-6c0-3 2-5 4.5-5s3.5 2 3.5 5v6M11 10v10" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    play: <path d="m9 7 9 5-9 5V7Z" />,
    pressure: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m12 12 4-4M7 17h10" />
      </>
    ),
    report: (
      <>
        <path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h6" />
      </>
    ),
    temperature: (
      <>
        <path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z" />
        <path d="M12 8v8" />
      </>
    ),
    x: <path d="M6 6l12 12M18 6 6 18" />,
  }

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function Button({
  children,
  href,
  outline = false,
  type = "button",
}: {
  children: ReactNode
  href?: string
  outline?: boolean
  type?: "button" | "submit"
}) {
  const className = `button ${outline ? "button--outline" : "button--primary"}`
  return href ? (
    <a className={className} href={href}>
      {children}
    </a>
  ) : (
    <button className={className} type={type}>
      {children}
    </button>
  )
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`logo ${light ? "logo--light" : ""}`}
      href="#top"
      aria-label="Qlic home"
    >
      <span>
        <Icon name="drop" size={20} />
      </span>
      Qlic
    </a>
  )
}

function Section({
  children,
  eyebrow,
  id,
  intro,
  soft = false,
  title,
}: {
  children: ReactNode
  eyebrow: string
  id?: string
  intro?: string
  soft?: boolean
  title: string
}) {
  return (
    <section className={`section ${soft ? "section--soft" : ""}`} id={id}>
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const locale = i18n.language.startsWith("es") ? "es-419" : "en"

  function selectLocale(value: string) {
    if (supportedLocales.includes(value as Locale))
      void changeLocale(value as Locale)
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />
        <nav aria-label={t("nav.product")} className="desktop-nav">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.id}>
              {t(`nav.${item.id}`)}
            </a>
          ))}
        </nav>
        <div className="navbar__actions">
          <label className="language">
            <span className="sr-only">{t("nav.language")}</span>
            <select
              aria-label={t("nav.language")}
              onChange={(event) => selectLocale(event.target.value)}
              value={locale}
            >
              <option value="en">EN</option>
              <option value="es-419">ES</option>
            </select>
          </label>
          <Button href="#contact">{t("nav.contact")}</Button>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "x" : "menu"} />
          </button>
        </div>
      </div>
      <nav
        aria-label={t("nav.product")}
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        id="mobile-navigation"
      >
        {navigationItems.map((item) => (
          <a href={item.href} key={item.id} onClick={() => setMenuOpen(false)}>
            {t(`nav.${item.id}`)}
          </a>
        ))}
        <a
          className="mobile-nav__cta"
          href="#contact"
          onClick={() => setMenuOpen(false)}
        >
          {t("nav.contact")} <Icon name="arrow" size={17} />
        </a>
      </nav>
    </header>
  )
}

function DashboardPreview() {
  const { t } = useTranslation()
  return (
    <div className="dashboard">
      <div className="dashboard__topbar">
        <Logo />
        <div className="dashboard__avatar" />
      </div>
      <div className="dashboard__content">
        <div className="dashboard__greeting">
          <div>
            <small>{t("dashboard.greeting")}</small>
            <strong>{t("dashboard.title")}</strong>
          </div>
          <span>{t("dashboard.today")}⌄</span>
        </div>
        <div className="metric-grid">
          <div>
            <span className="metric-icon">
              <Icon name="drop" size={18} />
            </span>
            <small>{t("dashboard.liveFlow")}</small>
            <strong>
              8.4 <em>{t("dashboard.flowUnit")}</em>
            </strong>
            <i className="positive">{t("dashboard.change")}</i>
          </div>
          <div>
            <span className="metric-icon">
              <Icon name="pressure" size={18} />
            </span>
            <small>{t("dashboard.pressure")}</small>
            <strong>
              3.1 <em>{t("dashboard.pressureUnit")}</em>
            </strong>
            <i>{t("dashboard.healthy")}</i>
          </div>
          <div>
            <span className="metric-icon">
              <Icon name="temperature" size={18} />
            </span>
            <small>{t("dashboard.temperature")}</small>
            <strong>
              18° <em>{t("dashboard.temperatureUnit")}</em>
            </strong>
            <i>{t("dashboard.normal")}</i>
          </div>
        </div>
        <div className="usage-chart">
          <div>
            <strong>{t("dashboard.consumption")}</strong>
            <span>{t("dashboard.period")}</span>
          </div>
          <svg
            viewBox="0 0 520 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0C4AFD" stopOpacity=".16" />
                <stop offset="100%" stopColor="#0C4AFD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              className="chart-area"
              d="M0 130 C50 126 48 70 105 82 S178 124 224 88 S296 32 350 64 S430 105 520 30 V160 H0Z"
            />
            <path
              className="chart-line"
              d="M0 130 C50 126 48 70 105 82 S178 124 224 88 S296 32 350 64 S430 105 520 30"
            />
          </svg>
          <div className="chart-labels">
            {(t("dashboard.days", { returnObjects: true }) as string[]).map(
              (day) => (
                <span key={day}>{day}</span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  const { t } = useTranslation()
  return (
    <section className="hero" id="product">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1>{t("hero.title")}</h1>
          <p>{t("hero.description")}</p>
          <div className="hero__buttons">
            <Button href="#pricing">
              {t("hero.primaryCta")} <Icon name="arrow" />
            </Button>
            <Button href="#about-the-product" outline>
              {t("hero.secondaryCta")}
            </Button>
          </div>
          <div className="chips">
            {(["realtime", "alerts", "reports"] as const).map((chip) => (
              <span key={chip}>
                <Icon name="check" size={15} />
                {t(`hero.chips.${chip}`)}
              </span>
            ))}
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>
  )
}

function InfoCards({
  cards,
  translationPath,
  numbered = false,
}: {
  cards: ReadonlyArray<{ id: string icon: IconName }>
  translationPath: string
  numbered?: boolean
}) {
  const { t } = useTranslation()
  return (
    <div className="three-grid">
      {cards.map((card, index) => (
        <article className="info-card" key={card.id}>
          <div className="card-top">
            <span className="icon-tile">
              <Icon name={card.icon} />
            </span>
            {numbered && <span className="card-number">0{index + 1}</span>}
          </div>
          <h3>{t(`${translationPath}.${card.id}.title`)}</h3>
          <p>{t(`${translationPath}.${card.id}.text`)}</p>
        </article>
      ))}
    </div>
  )
}

function TeamCards() {
  const { t } = useTranslation()
  return (
    <div className="team-grid">
      {teamMembers.map((member) => (
        <article className="team-card" key={member.name}>
          <div aria-hidden="true" className="team-card__avatar">
            {member.initials}
          </div>
          <div>
            <h3>{member.name}</h3>
            <p>{t(member.responsibilityKey)}</p>
          </div>
        </article>
      ))}
    </div>
  )
}

function SegmentCards() {
  const { t } = useTranslation()
  return (
    <div className="segment-grid">
      {segments.map((segment, index) => (
        <article className="segment-card" key={segment.id}>
          <div className={`segment-visual segment-visual--${index + 1}`}>
            <span className="segment-icon">
              <Icon name={segment.icon} size={30} />
            </span>
            <div className="mini-dashboard">
              <span />
              <span />
              <span />
              <svg
                viewBox="0 0 200 60"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0 48 C35 48 40 15 70 26 S110 45 137 22 S170 8 200 17" />
              </svg>
            </div>
          </div>
          <div className="segment-card__body">
            <h3>{t(`sections.solutions.${segment.id}.title`)}</h3>
            <p>{t(`sections.solutions.${segment.id}.text`)}</p>
            <a href="#contact">
              {t(`sections.solutions.${segment.id}.link`)}{" "}
              <Icon name="arrow" size={18} />
            </a>
          </div>
        </article>
      ))}
    </div>
  )
}

function Video() {
  const { t } = useTranslation()
  return (
    <div className="video">
      <div className="video__content">
        <span className="eyebrow">{t("sections.product.label")}</span>
        <strong>{t("sections.product.headline")}</strong>
      </div>
      <button aria-label={t("sections.product.play")}>
        <Icon name="play" size={30} />
      </button>
      <span className="video__duration">{t("sections.product.duration")}</span>
    </div>
  )
}

function Testimonials() {
  const { t } = useTranslation()
  const items = t("sections.stories.items", { returnObjects: true }) as Array<{
    quote: string
    name: string
    role: string
  }>
  return (
    <div className="three-grid">
      {items.map((item) => (
        <article className="testimonial" key={item.name}>
          <span className="quote">“</span>
          <blockquote>{item.quote}</blockquote>
          <div className="person">
            <div>{item.name.charAt(0)}</div>
            <p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

function Plans() {
  const { t } = useTranslation()
  return (
    <div className="plans">
      {plans.map((plan, index) => (
        <article
          className={`plan-card ${index === 1 ? "plan-card--featured" : ""}`}
          key={plan.id}
        >
          {index === 1 && (
            <span className="plan-badge">
              {t("sections.pricing.pro.badge")}
            </span>
          )}
          <h3>{t(`sections.pricing.${plan.id}.name`)}</h3>
          <p>{t(`sections.pricing.${plan.id}.audience`)}</p>
          <div className="price">
            {plan.price}
            <span>{t("sections.pricing.month")}</span>
          </div>
          <ul>
            {plan.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={18} />
                {t(`sections.pricing.${plan.id}.features.${feature}`)}
              </li>
            ))}
          </ul>
          <Button href="#contact" outline={index === 0}>
            {t(`sections.pricing.${plan.id}.cta`)}
          </Button>
        </article>
      ))}
    </div>
  )
}

function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)
  const items = t("sections.faq.items", { returnObjects: true }) as Array<{
    question: string
    answer: string
  }>
  return (
    <div className="accordions">
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <article
            className={`accordion ${isOpen ? "open" : ""}`}
            key={item.question}
          >
            <button
              aria-controls={`faq-answer-${index}`}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              {item.question}
              <Icon name="chevron" />
            </button>
            {isOpen && <p id={`faq-answer-${index}`}>{item.answer}</p>}
          </article>
        )
      })}
    </div>
  )
}

function ContactForm() {
  const { t } = useTranslation()
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors = {
      name: !String(data.get("name") ?? "").trim(),
      email: !/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? "")),
      message: !String(data.get("message") ?? "").trim(),
    }
    setErrors(nextErrors)
    const valid = !Object.values(nextErrors).some(Boolean)
    setSent(valid)
    if (valid) event.currentTarget.reset()
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <label>
        {t("form.name")}
        <input
          aria-invalid={errors.name}
          name="name"
          placeholder={t("form.namePlaceholder")}
        />
        {errors.name && (
          <span className="field-error">
            <Icon name="alert" size={14} />
            {t("form.errors.name")}
          </span>
        )}
      </label>
      <label>
        {t("form.email")}
        <input
          aria-invalid={errors.email}
          name="email"
          placeholder={t("form.emailPlaceholder")}
          type="email"
        />
        {errors.email && (
          <span className="field-error">
            <Icon name="alert" size={14} />
            {t("form.errors.email")}
          </span>
        )}
      </label>
      <label>
        {t("form.message")}
        <textarea
          aria-invalid={errors.message}
          name="message"
          placeholder={t("form.messagePlaceholder")}
          rows={4}
        />
        {errors.message && (
          <span className="field-error">
            <Icon name="alert" size={14} />
            {t("form.errors.message")}
          </span>
        )}
      </label>
      {sent && (
        <div aria-live="polite" className="form-success">
          <Icon name="check" size={18} />
          {t("form.success")}
        </div>
      )}
      <Button type="submit">
        {t("form.submit")} <Icon name="arrow" />
      </Button>
    </form>
  )
}

function Footer() {
  const { t } = useTranslation()
  const groups = [
    { title: "company", links: ["about", "team", "contact"] },
    { title: "help", links: ["support", "installation", "faq"] },
    { title: "community", links: ["stories", "partners", "news"] },
  ]
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo light />
            <p>{t("footer.description")}</p>
          </div>
          <div className="footer-links">
            {groups.map((group) => (
              <div key={group.title}>
                <h3>{t(`footer.${group.title}`)}</h3>
                {group.links.map((link) => (
                  <a
                    href={
                      link === "contact"
                        ? "#contact"
                        : `#${
                            link === "about"
                              ? "about-us"
                              : link === "stories"
                                ? "testimonies"
                                : link
                          }`
                    }
                    key={link}
                  >
                    {t(`footer.${link}`)}
                  </a>
                ))}
              </div>
            ))}
            <div>
              <h3>{t("footer.follow")}</h3>
              <div className="socials">
                <span aria-label="Instagram" className="social-link">
                  <Icon name="instagram" />
                </span>
                <span aria-label="LinkedIn" className="social-link">
                  <Icon name="linkedin" />
                </span>
                <span aria-label="Facebook" className="social-link">
                  <Icon name="facebook" />
                </span>
                <span aria-label="X" className="social-link">
                  <Icon name="x" />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t("footer.rights")}</span>
          <a href="#terms">{t("footer.terms")}</a>
        </div>
      </div>
    </footer>
  )
}

function DocumentLanguageSync() {
  const { t } = useTranslation()
  useEffect(() => {
    const locale = i18n.language.startsWith("es") ? "es-419" : "en"
    document.documentElement.lang = locale
    document.title = t("meta.title")
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("meta.description"))
  }, [t])
  return null
}

export default function App() {
  const { t } = useTranslation()
  return (
    <div id="top">
      <DocumentLanguageSync />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Section
          eyebrow={t("sections.visibility.eyebrow")}
          title={t("sections.visibility.title")}
          intro={t("sections.visibility.intro")}
        >
          <InfoCards
            cards={visibilityCards}
            numbered
            translationPath="sections.visibility.cards"
          />
        </Section>
        <Section
          eyebrow={t("sections.about.eyebrow")}
          id="about-us"
          title={t("sections.about.title")}
        >
          <InfoCards
            cards={aboutCards}
            translationPath="sections.about.cards"
          />
        </Section>
        <Section
          eyebrow={t("sections.team.eyebrow")}
          id="team"
          title={t("sections.team.title")}
          intro={t("sections.team.intro")}
        >
          <TeamCards />
        </Section>
        <Section
          eyebrow={t("sections.solutions.eyebrow")}
          id="solutions"
          title={t("sections.solutions.title")}
          soft
        >
          <SegmentCards />
        </Section>
        <Section
          eyebrow={t("sections.features.eyebrow")}
          id="features"
          title={t("sections.features.title")}
        >
          <InfoCards
            cards={featureCards}
            translationPath="sections.features.cards"
          />
        </Section>
        <Section
          eyebrow={t("sections.product.eyebrow")}
          id="about-the-product"
          title={t("sections.product.title")}
        >
          <Video />
        </Section>
        <Section
          eyebrow={t("sections.stories.eyebrow")}
          id="testimonies"
          title={t("sections.stories.title")}
        >
          <Testimonials />
        </Section>
        <Section
          eyebrow={t("sections.pricing.eyebrow")}
          id="pricing"
          title={t("sections.pricing.title")}
        >
          <Plans />
        </Section>
        <Section
          eyebrow={t("sections.faq.eyebrow")}
          id="faq"
          title={t("sections.faq.title")}
        >
          <FAQ />
        </Section>
        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">{t("form.eyebrow")}</span>
              <h2>{t("form.title")}</h2>
              <p>{t("form.intro")}</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
