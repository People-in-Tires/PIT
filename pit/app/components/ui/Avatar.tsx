type AvatarProps = {
  image: string;
  alt?: string;
  className?: string;
};

export function Avatar({ image, alt = "", className }: AvatarProps) {
  const src = image.startsWith("uploads/") ? `/${image}` : `/avatars/${image}`;
  return <img src={src} alt={alt} className={className} />;
}
