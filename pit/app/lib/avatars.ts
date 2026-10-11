export const DEFAULT_AVATAR = "default.jpg";

export const AVATARS = [
  "aqua-nitro.png",
  "blue-thunder.png",
  "emerald-edge.png",
  "golden-apex.png",
  "nightfall-racing.png",
  "orange-mascot.png",
  "red-comet.png",
  "redline-rebel.png",
  "scuderia-blaze.png",
  "shadow-racer.png",
  "sonic-shift.png",
  "turbo-pixie.png",
] as const;

// wat de server mag accepteren: de 12 avatars + de default (zodat je terug kunt)
export const ALLOWED_AVATARS = [DEFAULT_AVATAR, ...AVATARS] as const;
