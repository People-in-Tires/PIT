import "./garage.css";
import Link from "next/link";
import { Logout } from "../(user)/profile/settings/logout/Logout";

export default function Garage() {
  return (
    <div className="garage">
      <img className="logo" id="logo" src="/PIT.png" alt="Logo" />

      <div className="actions">
        <Link className="btn" href="/lobby">
          Join Game
        </Link>
        <Link className="btn btn-secondary" href="/profile">
          Profile
        </Link>
        <Logout />
      </div>
    </div>
  );
}
