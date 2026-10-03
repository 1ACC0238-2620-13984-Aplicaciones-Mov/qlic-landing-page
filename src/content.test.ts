import { describe, expect, it } from "vitest"
import { teamMembers } from "./content"

describe("Qlic team content", () => {
  it("contains the four project members and their responsibilities", () => {
    expect(teamMembers).toHaveLength(4)
    expect(teamMembers.map((member) => member.name)).toEqual([
      "Avila Palacios, Aaron Alexander",
      "Briceño Llanos, Ayrton Omar",
      "Conde Huashuayo, Sebasthian Alex",
      "Condori Lozano, Alessandro Ramiro",
    ])
    expect(
      teamMembers.every((member) => member.responsibility.length > 0),
    ).toBe(true)
  })
})
