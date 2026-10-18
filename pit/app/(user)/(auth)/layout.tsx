import "./auth.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-screen">
      <main className="auth-scroll">{children}</main>
    </div>
  );
}
