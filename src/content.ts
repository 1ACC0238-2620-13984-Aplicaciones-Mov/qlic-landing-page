export type IconName =
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

export const teamMembers = [
  {
    name: "Avila Palacios, Aaron Alexander",
    responsibility: "Sprint planning and deployment",
    responsibilityKey: "team.members.aaron",
    initials: "AA",
  },
  {
    name: "Briceño Llanos, Ayrton Omar",
    responsibility: "Landing Page implementation",
    responsibilityKey: "team.members.ayrton",
    initials: "AO",
  },
  {
    name: "Conde Huashuayo, Sebasthian Alex",
    responsibility: "Product Backlog and estimations",
    responsibilityKey: "team.members.sebasthian",
    initials: "SA",
  },
  {
    name: "Condori Lozano, Alessandro Ramiro",
    responsibility: "Collaboration and interface support",
    responsibilityKey: "team.members.alessandro",
    initials: "AR",
  },
] as const;

export const visibilityCards = [
  { id: "liveConsumption", icon: "drop" as IconName },
  { id: "pressureHealth", icon: "pressure" as IconName },
  { id: "temperatureControl", icon: "temperature" as IconName },
] as const;

export const aboutCards = [
  { id: "conservation", icon: "drop" as IconName },
  { id: "connected", icon: "chart" as IconName },
  { id: "impact", icon: "report" as IconName },
] as const;

export const featureCards = [
  { id: "monitoring", icon: "chart" as IconName },
  { id: "alerts", icon: "alert" as IconName },
  { id: "reports", icon: "report" as IconName },
] as const;

export const segments = [
  { id: "homes", icon: "home" as IconName },
  { id: "businesses", icon: "building" as IconName },
] as const;

export const plans = [
  {
    id: "basic",
    price: "$12",
    features: ["oneSensor", "liveMonitoring", "leakAlerts"],
  },
  {
    id: "pro",
    price: "$29",
    features: ["threeSensors", "customAlerts", "weeklyReports"],
  },
] as const;

export const navigationItems = [
  { id: "product", href: "#product" },
  { id: "about", href: "#about-us" },
  { id: "team", href: "#team" },
  { id: "solutions", href: "#solutions" },
  { id: "features", href: "#features" },
  { id: "stories", href: "#testimonies" },
  { id: "pricing", href: "#pricing" },
  { id: "faq", href: "#faq" },
] as const;

