import { getThemeId, THEME_IDS, type ThemeId } from "./themes";

export function avatarFile(id: ThemeId): string {
  return `${id}.png`;
}

export const ALLOWED_AVATARS: string[] = THEME_IDS.map((v) => v + ".png");

export function avatarId(file: string | null | undefined): ThemeId {
  return getThemeId(file?.replace(/\.png$/, ""));
}
