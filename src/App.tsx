import { FormEvent, ReactNode, useState } from "react";

type IconName =
  | "alert"
  | "arrow"
  | "building"
  | "chart"
  | "check"
  | "chevron"
  | "drop"
  | "facebook"
  | "home"
  | "instagram"
  | "linkedin"
  | "play"
  | "pressure"
  | "report"
  | "temperature"
  | "x";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
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
    drop: <path d="M12 3C9 7 6.5 10 6.5 14a5.5 5.5 0 0 0 11 0C17.5 10 15 7 12 3Z" />,
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z" />,
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
  };

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
  );
}

function Button({
  children,
  href,
  outline = false,
  type = "button",
}: {
  children: ReactNode;
  href?: string;
  outline?: boolean;
  type?: "button" | "submit";
}) {
  const className = `button ${outline ? "button--outline" : "button--primary"}`;
  return href ? (
    <a className={className} href={href}>
      {children}
    </a>
  ) : (
    <button className={className} type={type}>
      {children}
    </button>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo--light" : ""}`} href="#top" aria-label="Qlic home">
      <span>
        <Icon name="drop" size={20} />
      </span>
      Qlic
    </a>
  );
}

function Section({
  children,
  eyebrow,
  id,
  intro,
  soft = false,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  id?: string;
  intro?: string;
  soft?: boolean;
  title: string;
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
  );
}

function Navbar() {
  const links = ["Product", "About Us", "Team", "Solutions", "Features", "Testimonies", "Pricing", "FAQ"];
  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Logo />
        <nav aria-label="Main navigation">
          {links.map((link) => (
            <a href={`#${link.toLowerCase().replaceAll(" ", "-")}`} key={link}>
              {link}
            </a>
          ))}
        </nav>
        <div className="navbar__actions">
          <label className="language">
            <span className="sr-only">Language</span>
            <select aria-label="Select language" defaultValue="EN">
              <option>EN</option>
              <option>ES</option>
            </select>
          </label>
          <Button href="#contact">Contact Sales</Button>
        </div>
      </div>
    </header>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard">
      <div className="dashboard__topbar">
        <Logo />
        <div className="dashboard__avatar" />
      </div>
      <div className="dashboard__content">
        <div className="dashboard__greeting">
          <div>
            <small>GOOD MORNING</small>
            <strong>Your water at a glance</strong>
          </div>
          <span>Today⌄</span>
        </div>
        <div className="metric-grid">
          <div>
            <span className="metric-icon"><Icon name="drop" size={18} /></span>
            <small>LIVE FLOW</small>
            <strong>8.4 <em>L/min</em></strong>
            <i className="positive">↓ 12% today</i>
          </div>
          <div>
            <span className="metric-icon"><Icon name="pressure" size={18} /></span>
            <small>PRESSURE</small>
            <strong>3.1 <em>bar</em></strong>
            <i>Healthy range</i>
          </div>
          <div>
            <span className="metric-icon"><Icon name="temperature" size={18} /></span>
            <small>TEMPERATURE</small>
            <strong>18° <em>C</em></strong>
            <i>Normal</i>
          </div>
        </div>
        <div className="usage-chart">
          <div><strong>Water consumption</strong><span>Last 7 days</span></div>
          <svg viewBox="0 0 520 160" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0C4AFD" stopOpacity=".16" />
                <stop offset="100%" stopColor="#0C4AFD" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="chart-area" d="M0 130 C50 126 48 70 105 82 S178 124 224 88 S296 32 350 64 S430 105 520 30 V160 H0Z" />
            <path className="chart-line" d="M0 130 C50 126 48 70 105 82 S178 124 224 88 S296 32 350 64 S430 105 520 30" />
          </svg>
          <div className="chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="product">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="eyebrow">WATER INTELLIGENCE, SIMPLIFIED</span>
          <h1>Smart water monitoring for homes and businesses</h1>
          <p>Track volume, pressure and temperature in real time with clear alerts and reports.</p>
          <div className="hero__buttons">
            <Button href="#pricing">Get started <Icon name="arrow" /></Button>
            <Button href="#about-the-product" outline>See how it works</Button>
          </div>
          <div className="chips">
            {["Real-time data", "Smart alerts", "Clear reports"].map((chip) => (
              <span key={chip}><Icon name="check" size={15} />{chip}</span>
            ))}
          </div>
        </div>
        <DashboardPreview />
      </div>
    </section>
  );
}

const visibilityCards: [string, string, IconName][] = [
  ["Live consumption", "Follow every liter as it moves through your property.", "drop"],
  ["Pressure health", "Keep pressure within a healthy range and spot changes early.", "pressure"],
  ["Temperature control", "Monitor water temperature with a clear, continuous view.", "temperature"],
];

const aboutCards: [string, string, IconName][] = [
  ["Built for conservation", "Simple water intelligence that helps every property use less.", "drop"],
  ["Connected by design", "Reliable IoT monitoring keeps your spaces visible around the clock.", "chart"],
  ["Impact you can measure", "Turn clear data into better decisions for budgets and the planet.", "report"],
];

const features: [string, string, IconName][] = [
  ["Real-time monitoring", "See volume, pressure and temperature from one clear dashboard.", "chart"],
  ["Smart leak alerts", "Get notified when Qlic detects unusual use or a possible leak.", "alert"],
  ["Actionable reports", "Compare usage and discover patterns with simple periodic reports.", "report"],
];

function InfoCards({ cards, numbered = false }: { cards: [string, string, IconName][]; numbered?: boolean }) {
  return (
    <div className="three-grid">
      {cards.map(([title, text, icon], index) => (
        <article className="info-card" key={title}>
          <div className="card-top">
            <span className="icon-tile"><Icon name={icon} /></span>
            {numbered && <span className="card-number">0{index + 1}</span>}
          </div>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

const team = [
  { name: "Technology", role: "Connected systems", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=faces&fit=crop&fm=jpg&q=82&w=480&h=560" },
  { name: "Sustainability", role: "Smarter resources", image: "https://images.unsplash.com/photo-1627161683077-e34782c24d81?crop=faces&fit=crop&fm=jpg&q=82&w=480&h=560" },
  { name: "Data", role: "Useful insights", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=faces&fit=crop&fm=jpg&q=82&w=480&h=560" },
  { name: "People", role: "Human support", image: "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?crop=faces&fit=crop&fm=jpg&q=82&w=480&h=560" },
  { name: "Impact", role: "Measurable change", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&fm=jpg&q=82&w=480&h=560" },
];

function TeamCards() {
  return (
    <div className="team-grid">
      {team.map((member) => (
        <article className="team-card" key={member.name}>
          <img src={member.image} alt="" />
          <div><h3>{member.name}</h3><p>{member.role}</p></div>
        </article>
      ))}
    </div>
  );
}

function SegmentCards() {
  const segments: [string, string, IconName][] = [
    ["Homes", "Catch leaks early, understand daily use and build better habits together.", "home"],
    ["Businesses", "Control costs across your operation and keep every location visible.", "building"],
  ];
  return (
    <div className="segment-grid">
      {segments.map(([title, text, icon], index) => (
        <article className="segment-card" key={title}>
          <div className={`segment-visual segment-visual--${index + 1}`}>
            <span className="segment-icon"><Icon name={icon} size={30} /></span>
            <div className="mini-dashboard">
              <span /><span /><span />
              <svg viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 48 C35 48 40 15 70 26 S110 45 137 22 S170 8 200 17" /></svg>
            </div>
          </div>
          <div className="segment-card__body">
            <h3>{title}</h3>
            <p>{text}</p>
            <a href="#contact">Explore solution <Icon name="arrow" size={18} /></a>
          </div>
        </article>
      ))}
    </div>
  );
}

function Video() {
  return (
    <div className="video">
      <div className="video__content">
        <span className="eyebrow">MEET QLIC</span>
        <strong>Every drop, clearly understood.</strong>
      </div>
      <button aria-label="Play product video"><Icon name="play" size={30} /></button>
      <span className="video__duration">01:48</span>
    </div>
  );
}

const testimonials = [
  ["Qlic helped us find a hidden leak in the first week. The dashboard paid for itself almost immediately.", "Marina R.", "Homeowner"],
  ["Our team finally has a simple way to understand water use across the whole operation.", "David L.", "Cafe owner"],
  ["The alerts are clear and timely. We act quickly instead of discovering a problem on the monthly bill.", "Sara M.", "Studio manager"],
];

function Testimonials() {
  return (
    <div className="three-grid">
      {testimonials.map(([quote, name, role]) => (
        <article className="testimonial" key={name}>
          <span className="quote">“</span>
          <blockquote>{quote}</blockquote>
          <div className="person">
            <div>{name.charAt(0)}</div>
            <p><strong>{name}</strong><span>{role}</span></p>
          </div>
        </article>
      ))}
    </div>
  );
}

const plans = [
  { name: "Plan Básico", price: "$12", text: "For apartments and houses", features: ["1 connected sensor", "Live monitoring", "Leak and usage alerts"] },
  { name: "Plan Gestión Pro", price: "$29", text: "For shops and growing teams", features: ["Up to 3 sensors", "Custom alert rules", "Advanced weekly reports"] },
];

function Plans() {
  return (
    <div className="plans">
      {plans.map((plan, index) => (
        <article className={`plan-card ${index === 1 ? "plan-card--featured" : ""}`} key={plan.name}>
          {index === 1 && <span className="plan-badge">MOST POPULAR</span>}
          <h3>{plan.name}</h3>
          <p>{plan.text}</p>
          <div className="price">{plan.price}<span>/ month</span></div>
          <ul>
            {plan.features.map((feature) => <li key={feature}><Icon name="check" size={18} />{feature}</li>)}
          </ul>
          <Button href="#contact" outline={index === 0}>Choose plan</Button>
        </article>
      ))}
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const items = [
    ["How does Qlic measure my water use?", "A compact IoT sensor measures volume, pressure and temperature, then securely sends the data to your dashboard."],
    ["Will I know when there is a leak?", "Yes. Qlic looks for unusual patterns and sends a clear alert so you can investigate quickly."],
    ["Do I need professional installation?", "Installation depends on your plumbing. Our team will recommend the simplest option for your property."],
  ];
  return (
    <div className="accordions">
      {items.map(([question, answer], index) => (
        <article className={`accordion ${open === index ? "open" : ""}`} key={question}>
          <button aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
            {question}<Icon name="chevron" />
          </button>
          {open === index && <p>{answer}</p>}
        </article>
      ))}
    </div>
  );
}

function ContactForm() {
  const [error, setError] = useState(true);
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const invalid = !data.get("name") || !String(data.get("email")).includes("@") || !data.get("message");
    setError(invalid);
    setSent(!invalid);
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <label>Name<input name="name" placeholder="Your name" /></label>
      <label>
        Email
        <input aria-invalid={error} name="email" placeholder="you@company.com" type="email" />
        {error && <span className="field-error"><Icon name="alert" size={14} />Please enter a valid email address.</span>}
      </label>
      <label>Message<textarea name="message" placeholder="Tell us about your water monitoring needs" rows={4} /></label>
      {sent && <div className="form-success"><Icon name="check" size={18} />Message sent. We will be in touch soon.</div>}
      <Button type="submit">Send <Icon name="arrow" /></Button>
    </form>
  );
}

function Footer() {
  const groups = [
    ["Company", "About Us", "Team", "Contact"],
    ["Get Help", "Support", "Installation", "FAQ"],
    ["Community", "Water stories", "Partners", "News"],
  ];
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand"><Logo light /><p>Smarter water use starts with better visibility.</p></div>
          <div className="footer-links">
            {groups.map(([title, ...links]) => (
              <div key={title}><h3>{title}</h3>{links.map((link) => <a href="#" key={link}>{link}</a>)}</div>
            ))}
            <div>
              <h3>Follow Us</h3>
              <div className="socials">
                <a href="#" aria-label="Instagram"><Icon name="instagram" /></a>
                <a href="#" aria-label="LinkedIn"><Icon name="linkedin" /></a>
                <a href="#" aria-label="Facebook"><Icon name="facebook" /></a>
                <a href="#" aria-label="X"><Icon name="x" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>©2025 Qlic. All rights reserved</span>
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero />
        <Section eyebrow="WHY QLIC" title="Full visibility of your water" intro="Real-time clarity that turns everyday water data into confident decisions.">
          <InfoCards cards={visibilityCards} numbered />
        </Section>
        <Section eyebrow="OUR PURPOSE" id="about-us" title="About Us">
          <InfoCards cards={aboutCards} />
        </Section>
        <Section eyebrow="THE PEOPLE BEHIND QLIC" id="team" title="Our Team" intro="Five pillars powering Qlic:">
          <TeamCards />
        </Section>
        <Section eyebrow="MADE FOR YOUR SPACE" id="solutions" title="Solutions by segments" soft>
          <SegmentCards />
        </Section>
        <Section eyebrow="EVERYTHING YOU NEED" id="features" title="Key features">
          <InfoCards cards={features} />
        </Section>
        <Section eyebrow="SEE QLIC IN ACTION" id="about-the-product" title="About the product">
          <Video />
        </Section>
        <Section eyebrow="CUSTOMER STORIES" id="testimonies" title="What our customers say">
          <Testimonials />
        </Section>
        <Section eyebrow="SIMPLE, FLEXIBLE PRICING" id="pricing" title="Subscription plans">
          <Plans />
        </Section>
        <Section eyebrow="NEED TO KNOW" id="faq" title="Frequently asked questions">
          <FAQ />
        </Section>
        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div>
              <span className="eyebrow">LET'S TALK</span>
              <h2>Contact Sales</h2>
              <p>Tell us about your operation and a specialist will contact you.</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
