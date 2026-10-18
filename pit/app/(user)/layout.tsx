import "./user.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="user-laptop">
      <div className="user-screen">{children}</div>
      <p className="user-bezel" aria-hidden="true">
        BS
      </p>
    </div>
  );
}
