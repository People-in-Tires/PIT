// lib/themes.ts
// Theme ids are the single name used everywhere:
// DB value (User.theme) = <html data-theme> = CSS selector in styles/teams.css
// = avatar file name in /public/avatars/.
// Colors live ONLY in styles/teams.css — never here.

export const THEME_IDS = [
  "default",
  "shadow-racer",
  "scuderia-blaze",
  "red-comet",
  "redline-rebel",
  "aqua-nitro",
  "orange-mascot",
  "nightfall-racing",
  "sonic-shift",
  "blue-thunder",
  "turbo-pixie",
  "emerald-edge",
  "golden-apex",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const THEME_MODES = ["day", "night"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export type Theme = {
  id: ThemeId;
  name: string;
};

export const THEMES: Theme[] = [
  { id: "default", name: "P.I.T" },
  { id: "shadow-racer", name: "Shadow Racer" },
  { id: "scuderia-blaze", name: "Scuderia Blaze" },
  { id: "red-comet", name: "Red Comet" },
  { id: "redline-rebel", name: "Redline Rebel" },
  { id: "aqua-nitro", name: "Aqua Nitro" },
  { id: "orange-mascot", name: "Orange Mascot" },
  { id: "nightfall-racing", name: "Nightfall Racing" },
  { id: "sonic-shift", name: "Sonic Shift" },
  { id: "blue-thunder", name: "Blue Thunder" },
  { id: "turbo-pixie", name: "Turbo Pixie" },
  { id: "emerald-edge", name: "Emerald Edge" },
  { id: "golden-apex", name: "Golden Apex" },
];

export const DEFAULT_THEME: ThemeId = "default";
export const DEFAULT_MODE: ThemeMode = "day";

function isThemeId(value: string): value is ThemeId {
  return (THEME_IDS as readonly string[]).includes(value);
}

// Any unknown or missing value falls back to the default,
// so data-theme never gets a value without matching CSS.
export function getThemeId(value: string | null | undefined): ThemeId {
  return value && isThemeId(value) ? value : DEFAULT_THEME;
}

export function getThemeMode(value: string | null | undefined): ThemeMode {
  return value === "night" ? "night" : DEFAULT_MODE;
}

export function getTheme(value: string | null | undefined): Theme {
  const id = getThemeId(value);
  return THEMES.find((t) => t.id === id)!;
}