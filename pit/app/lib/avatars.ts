import { getThemeId, type ThemeId } from "./themes";

export function avatarFile(id: ThemeId): string {
  return `${id}.png`;
}

export function avatarId(file: string | null | undefined): ThemeId {
  return getThemeId(file?.replace(/\.png$/, ""));
}