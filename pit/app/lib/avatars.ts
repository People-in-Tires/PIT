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

// wat de server mag accepteren: de 12 avatars
export const ALLOWED_AVATARS = [...AVATARS] as const;
