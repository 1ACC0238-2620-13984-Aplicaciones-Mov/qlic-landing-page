import { describe, expect, it } from "vitest"
import { localeResources } from "./locales/index.ts"

describe("Qlic translations", () => {
  it("provides matching navigation and form keys in English and Spanish", () => {
    const english = localeResources.en.translation
    const spanish = localeResources["es-419"].translation

    expect(english).toEqual(expect.objectContaining({ nav: expect.any(Object), hero: expect.any(Object), form: expect.any(Object), footer: expect.any(Object) }))
    expect(spanish).toEqual(expect.objectContaining({ nav: expect.any(Object), hero: expect.any(Object), form: expect.any(Object), footer: expect.any(Object) }))
    expect(english.sections.pricing.month).toBe("/ month")
    expect(spanish.sections.pricing.month).toBe("/ mes")
  })
})
