const defaultImage = "og-image.svg"

export function buildSeoTags({
  title,
  description,
  keywords,
  author,
  canonical,
  locale,
  image = defaultImage,
}) {
  const baseUrl = new URL(canonical).origin + new URL(canonical).pathname
  const imageUrl = new URL(image, baseUrl).href

  return {
    title,
    description,
    keywords,
    author,
    canonical,
    locale,
    alternateLocale: locale === "es-419" ? "en" : "es-419",
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
      image: imageUrl,
    },
  }
}

export function applySeoTags(tags) {
  document.title = tags.title
  document.documentElement.lang = tags.locale

  const setMeta = (selector, attributes) => {
    let element = document.head.querySelector(selector)
    if (!element) {
      element = document.createElement("meta")
      document.head.append(element)
    }
    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, value)
    })
  }

  setMeta('meta[name="description"]', {
    name: "description",
    content: tags.description,
  })
  setMeta('meta[name="keywords"]', {
    name: "keywords",
    content: tags.keywords,
  })
  setMeta('meta[name="author"]', { name: "author", content: tags.author })

  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement("link")
    canonical.rel = "canonical"
    document.head.append(canonical)
  }
  canonical.href = tags.canonical

  const alternates = [
    { locale: "en", hrefLang: "en" },
    { locale: "es-419", hrefLang: "es-419" },
  ]
  alternates.forEach(({ hrefLang, locale }) => {
    let link = document.head.querySelector(`link[hreflang="${hrefLang}"]`)
    if (!link) {
      link = document.createElement("link")
      link.rel = "alternate"
      link.hreflang = hrefLang
      document.head.append(link)
    }
    link.href = tags.canonical
    link.dataset.locale = locale
  })

  const openGraph = {
    "og:title": tags.openGraph.title,
    "og:description": tags.openGraph.description,
    "og:type": tags.openGraph.type,
    "og:url": tags.openGraph.url,
    "og:image": tags.openGraph.image,
  }
  Object.entries(openGraph).forEach(([property, content]) => {
    setMeta(`meta[property="${property}"]`, { property, content })
  })
}
