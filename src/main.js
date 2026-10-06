import i18next from "i18next"
import { localeResources } from "./locales/index.ts"
import { aboutCards, featureCards, navigationItems, plans, segments, teamMembers, visibilityCards } from "./content.js"
import { applySeoTags, buildSeoTags } from "./seo.js"
import "./index.css"

const storageKey = "qlic-locale"
const canonicalUrl = "https://1acc0238-2620-13984-aplicaciones-mov.github.io/qlic-landing-page/"
const seoKeywords = {
  en: "Qlic, smart water monitoring, leak detection, water consumption, home, business",
  "es-419": "Qlic, monitoreo inteligente de agua, detección de fugas, consumo de agua, hogar, negocio",
}
const initialLocale = localStorage.getItem(storageKey) === "es-419" ? "es-419" : "en"

await i18next.init({
  resources: localeResources,
  lng: initialLocale,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
})

const root = document.querySelector("#root")

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function translate(key, options) {
  return i18next.t(key, options)
}

function icon(name, size = 20) {
  const paths = {
    alert: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="m10.3 3.7-7.8 14.3a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0Z"/>',
    arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
    building: '<path d="M4 21h16M6 21V5l6-2v18M12 8h4l2 2v11"/><path d="M9 8v.01M9 12v.01M9 16v.01M15 13v.01M15 17v.01"/>',
    chart: '<path d="M4 19V9M10 19V5M16 19v-7M22 19V2"/><path d="M2 19h22"/>',
    check: '<path d="m5 12 4 4 10-10"/>',
    chevron: '<path d="m7 10 5 5 5-5"/>',
    drop: '<path d="M12 3C9 7 6.5 10 6.5 14a5.5 5.5 0 0 0 11 0C17.5 10 15 7 12 3Z"/>',
    facebook: '<path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.6.4-1 1-1Z"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    linkedin: '<path d="M6 9v11M6 5v.01M11 20v-6c0-3 2-5 4.5-5s3.5 2 3.5 5v6M11 10v10"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    play: '<path d="m9 7 9 5-9 5V7Z"/>',
    pressure: '<circle cx="12" cy="12" r="9"/><path d="m12 12 4-4M7 17h10"/>',
    report: '<path d="M6 2h9l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/>',
    temperature: '<path d="M10 14.5V5a2 2 0 1 1 4 0v9.5a4 4 0 1 1-4 0Z"/><path d="M12 8v8"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
  }
  return `<svg aria-hidden="true" fill="none" height="${size}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24" width="${size}">${paths[name] ?? ""}</svg>`
}

function logo(light = false) {
  return `<a class="logo ${light ? "logo--light" : ""}" href="#top" aria-label="Qlic home"><span>${icon("drop", 20)}</span>Qlic</a>`
}

function button(label, href = "#", outline = false, extra = "") {
  return `<a class="button ${outline ? "button--outline" : "button--primary"} ${extra}" href="${href}">${label}</a>`
}

function section({ eyebrow, title, intro = "", id = "", soft = false, content }) {
  return `<section class="section ${soft ? "section--soft" : ""}"${id ? ` id="${id}"` : ""}><div class="container"><div class="section-heading"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ""}</div>${content}</div></section>`
}

function dashboardPreview() {
  const days = translate("dashboard.days", { returnObjects: true })
  return `<div class="dashboard"><div class="dashboard__topbar">${logo()}<div class="dashboard__avatar"></div></div><div class="dashboard__content"><div class="dashboard__greeting"><div><small>${translate("dashboard.greeting")}</small><strong>${translate("dashboard.title")}</strong></div><span>${translate("dashboard.today")}⌄</span></div><div class="metric-grid"><div><span class="metric-icon">${icon("drop", 18)}</span><small>${translate("dashboard.liveFlow")}</small><strong>8.4 <em>${translate("dashboard.flowUnit")}</em></strong><i class="positive">${translate("dashboard.change")}</i></div><div><span class="metric-icon">${icon("pressure", 18)}</span><small>${translate("dashboard.pressure")}</small><strong>3.1 <em>${translate("dashboard.pressureUnit")}</em></strong><i>${translate("dashboard.healthy")}</i></div><div><span class="metric-icon">${icon("temperature", 18)}</span><small>${translate("dashboard.temperature")}</small><strong>18° <em>${translate("dashboard.temperatureUnit")}</em></strong><i>${translate("dashboard.normal")}</i></div></div><div class="usage-chart"><div><strong>${translate("dashboard.consumption")}</strong><span>${translate("dashboard.period")}</span></div><svg viewBox="0 0 520 160" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0C4AFD" stop-opacity=".16"/><stop offset="100%" stop-color="#0C4AFD" stop-opacity="0"/></linearGradient></defs><path class="chart-area" d="M0 130 C50 126 48 70 105 82 S178 124 224 88 S296 32 350 64 S430 105 520 30 V160 H0Z"/><path class="chart-line" d="M0 130 C50 126 48 70 105 82 S178 124 224 88 S296 32 350 64 S430 105 520 30"/></svg><div class="chart-labels">${days.map((day) => `<span>${escapeHtml(day)}</span>`).join("")}</div></div></div></div>`
}

function infoCards(cards, translationPath, numbered = false) {
  return `<div class="three-grid">${cards.map((card, index) => `<article class="info-card"><div class="card-top"><span class="icon-tile">${icon(card.icon)}</span>${numbered ? `<span class="card-number">0${index + 1}</span>` : ""}</div><h3>${translate(`${translationPath}.${card.id}.title`)}</h3><p>${translate(`${translationPath}.${card.id}.text`)}</p></article>`).join("")}</div>`
}

function teamCards() {
  return `<div class="team-grid">${teamMembers.map((member) => `<article class="team-card"><div aria-hidden="true" class="team-card__avatar">${member.initials}</div><div><h3>${escapeHtml(member.name)}</h3><p>${translate(member.responsibilityKey)}</p></div></article>`).join("")}</div>`
}

function segmentCards() {
  return `<div class="segment-grid">${segments.map((segment, index) => `<article class="segment-card"><div class="segment-visual segment-visual--${index + 1}"><span class="segment-icon">${icon(segment.icon, 30)}</span><div class="mini-dashboard"><span></span><span></span><span></span><svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 48 C35 48 40 15 70 26 S110 45 137 22 S170 8 200 17"/></svg></div></div><div class="segment-card__body"><h3>${translate(`sections.solutions.${segment.id}.title`)}</h3><p>${translate(`sections.solutions.${segment.id}.text`)}</p><a href="#contact">${translate(`sections.solutions.${segment.id}.link`)} ${icon("arrow", 18)}</a></div></article>`).join("")}</div>`
}

function testimonials() {
  const items = translate("sections.stories.items", { returnObjects: true })
  return `<div class="three-grid">${items.map((item) => `<article class="testimonial"><span class="quote">“</span><blockquote>${escapeHtml(item.quote)}</blockquote><div class="person"><div>${escapeHtml(item.name.charAt(0))}</div><p><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.role)}</span></p></div></article>`).join("")}</div>`
}

function plansMarkup() {
  return `<div class="plans">${plans.map((plan, index) => `<article class="plan-card ${index === 1 ? "plan-card--featured" : ""}">${index === 1 ? `<span class="plan-badge">${translate("sections.pricing.pro.badge")}</span>` : ""}<h3>${translate(`sections.pricing.${plan.id}.name`)}</h3><p>${translate(`sections.pricing.${plan.id}.audience`)}</p><div class="price">${plan.price}<span>${translate("sections.pricing.month")}</span></div><ul>${plan.features.map((feature) => `<li>${icon("check", 18)}${translate(`sections.pricing.${plan.id}.features.${feature}`)}</li>`).join("")}</ul>${button(translate(`sections.pricing.${plan.id}.cta`), "#contact", index === 0)}</article>`).join("")}</div>`
}

function faqMarkup() {
  const items = translate("sections.faq.items", { returnObjects: true })
  return `<div class="accordions">${items.map((item, index) => `<article class="accordion"><button type="button" aria-controls="faq-answer-${index}" aria-expanded="false" data-faq="${index}">${escapeHtml(item.question)}${icon("chevron")}</button><p id="faq-answer-${index}" hidden>${escapeHtml(item.answer)}</p></article>`).join("")}</div>`
}

function contactForm() {
  return `<form class="contact-form" id="contact-form" novalidate><label>${translate("form.name")}<input aria-invalid="false" aria-describedby="name-error" name="name" placeholder="${translate("form.namePlaceholder")}"/><span class="field-error" id="name-error" hidden>${icon("alert", 14)}${translate("form.errors.name")}</span></label><label>${translate("form.email")}<input aria-invalid="false" aria-describedby="email-error" name="email" placeholder="${translate("form.emailPlaceholder")}" type="email"/><span class="field-error" id="email-error" hidden>${icon("alert", 14)}${translate("form.errors.email")}</span></label><label>${translate("form.message")}<textarea aria-invalid="false" aria-describedby="message-error" name="message" placeholder="${translate("form.messagePlaceholder")}" rows="4"></textarea><span class="field-error" id="message-error" hidden>${icon("alert", 14)}${translate("form.errors.message")}</span></label><div aria-live="polite" class="form-success" hidden>${icon("check", 18)}${translate("form.success")}</div><button class="button button--primary" type="submit">${translate("form.submit")} ${icon("arrow")}</button></form>`
}

function footer() {
  const groups = [
    { title: "company", links: ["about", "team", "contact"] },
    { title: "help", links: ["support", "installation", "faq"] },
    { title: "community", links: ["stories", "partners", "news"] },
  ]
  const hrefFor = (link) => `#${link === "contact" ? "contact" : link === "about" ? "about-us" : link === "stories" ? "testimonies" : link}`
  return `<footer><div class="container"><div class="footer-top"><div class="footer-brand">${logo(true)}<p>${translate("footer.description")}</p></div><div class="footer-links">${groups.map((group) => `<div><h3>${translate(`footer.${group.title}`)}</h3>${group.links.map((link) => `<a href="${hrefFor(link)}">${translate(`footer.${link}`)}</a>`).join("")}</div>`).join("")}<div><h3>${translate("footer.follow")}</h3><div class="socials"><span aria-label="Instagram" class="social-link">${icon("instagram")}</span><span aria-label="LinkedIn" class="social-link">${icon("linkedin")}</span><span aria-label="Facebook" class="social-link">${icon("facebook")}</span><span aria-label="X" class="social-link">${icon("x")}</span></div></div></div></div><div class="footer-bottom"><span>${translate("footer.rights")}</span><a href="#terms">${translate("footer.terms")}</a></div></div></footer>`
}

function navbar() {
  const locale = i18next.language.startsWith("es") ? "es-419" : "en"
  return `<header class="navbar"><div class="container navbar__inner">${logo()}<nav aria-label="${translate("nav.product")}" class="desktop-nav">${navigationItems.map((item) => `<a href="${item.href}">${translate(`nav.${item.id}`)}</a>`).join("")}</nav><div class="navbar__actions"><label class="language"><span class="sr-only">${translate("nav.language")}</span><select aria-label="${translate("nav.language")}" id="language-select"><option value="en" ${locale === "en" ? "selected" : ""}>EN</option><option value="es-419" ${locale === "es-419" ? "selected" : ""}>ES</option></select></label>${button(translate("nav.contact"), "#contact")}<button aria-controls="mobile-navigation" aria-expanded="false" aria-label="${translate("nav.openMenu")}" class="mobile-menu-toggle" id="mobile-menu-toggle">${icon("menu")}</button></div></div><nav aria-label="${translate("nav.product")}" class="mobile-nav" id="mobile-navigation">${navigationItems.map((item) => `<a href="${item.href}">${translate(`nav.${item.id}`)}</a>`).join("")}<a class="mobile-nav__cta" href="#contact">${translate("nav.contact")} ${icon("arrow", 17)}</a></nav></header>`
}

function render() {
  root.innerHTML = `<div id="top"><a class="skip-link" href="#main-content">Skip to content</a>${navbar()}<main id="main-content"><section class="hero" id="product"><div class="container hero__grid"><div class="hero__content"><span class="eyebrow">${translate("hero.eyebrow")}</span><h1>${translate("hero.title")}</h1><p>${translate("hero.description")}</p><div class="hero__buttons">${button(`${translate("hero.primaryCta")} ${icon("arrow")}`, "#pricing")}${button(translate("hero.secondaryCta"), "#about-the-product", true)}</div><div class="chips">${["realtime", "alerts", "reports"].map((chip) => `<span>${icon("check", 15)}${translate(`hero.chips.${chip}`)}</span>`).join("")}</div></div>${dashboardPreview()}</div></section>${section({ eyebrow: translate("sections.visibility.eyebrow"), title: translate("sections.visibility.title"), intro: translate("sections.visibility.intro"), content: infoCards(visibilityCards, "sections.visibility.cards", true) })}${section({ eyebrow: translate("sections.about.eyebrow"), title: translate("sections.about.title"), id: "about-us", content: infoCards(aboutCards, "sections.about.cards") })}${section({ eyebrow: translate("sections.team.eyebrow"), title: translate("sections.team.title"), intro: translate("sections.team.intro"), id: "team", content: teamCards() })}${section({ eyebrow: translate("sections.solutions.eyebrow"), title: translate("sections.solutions.title"), id: "solutions", soft: true, content: segmentCards() })}${section({ eyebrow: translate("sections.features.eyebrow"), title: translate("sections.features.title"), id: "features", content: infoCards(featureCards, "sections.features.cards") })}${section({ eyebrow: translate("sections.product.eyebrow"), title: translate("sections.product.title"), id: "about-the-product", content: `<div class="video"><div class="video__content"><span class="eyebrow">${translate("sections.product.label")}</span><strong>${translate("sections.product.headline")}</strong></div><button type="button" aria-label="${translate("sections.product.play")}">${icon("play", 30)}</button><span class="video__duration">${translate("sections.product.duration")}</span></div>` })}${section({ eyebrow: translate("sections.stories.eyebrow"), title: translate("sections.stories.title"), id: "testimonies", content: testimonials() })}${section({ eyebrow: translate("sections.pricing.eyebrow"), title: translate("sections.pricing.title"), id: "pricing", content: plansMarkup() })}${section({ eyebrow: translate("sections.faq.eyebrow"), title: translate("sections.faq.title"), id: "faq", content: faqMarkup() })}<section class="contact-section" id="contact"><div class="container contact-grid"><div><span class="eyebrow">${translate("form.eyebrow")}</span><h2>${translate("form.title")}</h2><p>${translate("form.intro")}</p></div>${contactForm()}</div></section></main>${footer()}</div>`
  applySeoTags(buildSeoTags({ title: translate("meta.title"), description: translate("meta.description"), keywords: seoKeywords[i18next.language] ?? seoKeywords.en, author: "Qlic Team", canonical: canonicalUrl, locale: i18next.language }))
  bindEvents()
}

function bindEvents() {
  document.querySelector("#language-select").addEventListener("change", async (event) => {
    localStorage.setItem(storageKey, event.target.value)
    await i18next.changeLanguage(event.target.value)
    render()
  })

  const menuButton = document.querySelector("#mobile-menu-toggle")
  const mobileNav = document.querySelector("#mobile-navigation")
  menuButton.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("mobile-nav--open")
    menuButton.setAttribute("aria-expanded", String(open))
    menuButton.setAttribute("aria-label", translate(open ? "nav.closeMenu" : "nav.openMenu"))
    menuButton.innerHTML = icon(open ? "x" : "menu")
  })
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => mobileNav.classList.remove("mobile-nav--open")))

  document.querySelectorAll("[data-faq]").forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      const answer = document.querySelector(`#${buttonElement.getAttribute("aria-controls")}`)
      const open = buttonElement.getAttribute("aria-expanded") === "true"
      buttonElement.setAttribute("aria-expanded", String(!open))
      buttonElement.closest(".accordion").classList.toggle("open", !open)
      answer.hidden = open
    })
  })

  document.querySelector("#contact-form").addEventListener("submit", (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const errors = {
      name: !String(data.get("name") ?? "").trim(),
      email: !/^\S+@\S+\.\S+$/.test(String(data.get("email") ?? "")),
      message: !String(data.get("message") ?? "").trim(),
    }
    Object.entries(errors).forEach(([field, invalid]) => {
      const input = form.elements[field]
      input.setAttribute("aria-invalid", String(invalid))
      document.querySelector(`#${field}-error`).hidden = !invalid
    })
    const valid = !Object.values(errors).some(Boolean)
    form.querySelector(".form-success").hidden = !valid
    if (valid) form.reset()
  })
}

render()
