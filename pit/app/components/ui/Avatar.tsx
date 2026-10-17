type AvatarProps = {
  image: string;
  alt?: string;
  className?: string;
};

export function Avatar({ image, alt = "", className }: AvatarProps) {
  return <img src={`/avatars/${image}`} alt={alt} className={className} />;
}