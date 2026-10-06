import { describe, expect, it } from "vitest"
import { buildSeoTags } from "./seo.js"

describe("Qlic SEO metadata", () => {
  it("builds the required static and social metadata for the landing page", () => {
    const tags = buildSeoTags({
      title: "Qlic | Smart Water Monitoring",
      description: "Monitor water use with Qlic.",
      keywords: "Qlic, smart water monitoring",
      author: "Qlic Team",
      canonical: "https://example.com/qlic/",
      locale: "en",
    })

    expect(tags).toEqual({
      title: "Qlic | Smart Water Monitoring",
      description: "Monitor water use with Qlic.",
      keywords: "Qlic, smart water monitoring",
      author: "Qlic Team",
      canonical: "https://example.com/qlic/",
      locale: "en",
      alternateLocale: "es-419",
      openGraph: {
        title: "Qlic | Smart Water Monitoring",
        description: "Monitor water use with Qlic.",
        type: "website",
        url: "https://example.com/qlic/",
        image: "https://example.com/qlic/og-image.svg",
      },
    })
  })
})
