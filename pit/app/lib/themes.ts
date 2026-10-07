// lib/themes.ts
// Color themes based on the 11 Formula 1 teams of the 2026 season + PIT default.
// Only --accent and --on-accent change per team; everything else stays PIT.
//
// accent   → buttons, badges, title shadow, input focus
// onAccent → text color placed ON the accent (e.g. button labels)
// logo     → file in /public/themes/, shown in the theme picker

export const THEME_IDS = [
  "pit",
  "mercedes",
  "red-bull",
  "ferrari",
  "mclaren",
  "aston-martin",
  "alpine",
  "williams",
  "racing-bulls",
  "haas",
  "audi",
  "cadillac",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export type Theme = {
  id: ThemeId;
  name: string;
  accent: string;
  onAccent: string;
  logo: string | null;
};

export const THEMES: Theme[] = [
  {
    id: "pit",
    name: "PIT",
    accent: "#f00c30",
    onAccent: "#ffffff",
    logo: null,
  },
  {
    id: "mercedes",
    name: "Mercedes",
    accent: "#27f4d2",
    onAccent: "#000000",
    logo: "/themes/mercedes.png",
  },
  {
    id: "red-bull",
    name: "Red Bull Racing",
    accent: "#3671c6",
    onAccent: "#ffffff",
    logo: "/themes/red-bull.png",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    accent: "#e8002d",
    onAccent: "#ffffff",
    logo: "/themes/ferrari.png",
  },
  {
    id: "mclaren",
    name: "McLaren",
    accent: "#ff8000",
    onAccent: "#000000",
    logo: "/themes/mclaren.png",
  },
  {
    id: "aston-martin",
    name: "Aston Martin",
    accent: "#229971",
    onAccent: "#000000",
    logo: "/themes/aston-martin.png",
  },
  {
    id: "alpine",
    name: "Alpine",
    accent: "#0093cc",
    onAccent: "#000000",
    logo: "/themes/alpine.png",
  },
  {
    id: "williams",
    name: "Williams",
    accent: "#64c4ff",
    onAccent: "#000000",
    logo: "/themes/williams.png",
  },
  {
    id: "racing-bulls",
    name: "Racing Bulls",
    accent: "#6692ff",
    onAccent: "#000000",
    logo: "/themes/racing-bulls.png",
  },
  {
    id: "haas",
    name: "Haas",
    accent: "#b6babd",
    onAccent: "#000000",
    logo: "/themes/haas.png",
  },
  {
    id: "audi",
    name: "Audi",
    accent: "#ff2d00",
    onAccent: "#ffffff",
    logo: "/themes/audi.png",
  },
  {
    id: "cadillac",
    name: "Cadillac",
    accent: "#d9d9d9",
    onAccent: "#000000",
    logo: "/themes/cadillac.png",
  },
];

export const DEFAULT_THEME: ThemeId = "pit";

export function getTheme(id: string | null | undefined): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}
