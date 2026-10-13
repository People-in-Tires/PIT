import "./homepage.css";
import Link from "next/link";

export default function Homepage() {
  return (
    <div className="homepage">
      <img className="logo" src="/PIT.png" alt="Logo" />

      <div className="actions">
        <Link className="btn" href="/login">
          Login
        </Link>
        <Link className="btn-secondary" href="/create">
          Create account
        </Link>
      </div>
    </div>
  );
}