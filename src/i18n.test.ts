import { describe, expect, it } from "vitest";
import { localeResources } from "./locales";

describe("Qlic translations", () => {
  it("provides matching navigation and form keys in English and Spanish", () => {
    const englishKeys = Object.keys(localeResources.en.translation);
    const spanishKeys = Object.keys(localeResources["es-419"].translation);

    expect(englishKeys).toEqual(expect.arrayContaining(["nav", "hero", "form", "footer"]));
    expect(spanishKeys).toEqual(expect.arrayContaining(["nav", "hero", "form", "footer"]));
    expect(spanishKeys).toEqual(englishKeys);
  });
});
