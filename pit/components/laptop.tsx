import styles from "../css/Laptop.module.css";
import "../css/Laptop.module.css";

import Image from "next/image";
import Link from "next/link";

import { useView } from "./engine/ViewManager";
import { Logout } from "@/app/(user)/profile/settings/logout/Logout";

function LandingLoggedIn() {
  return (
    <div className="landingpage">
      <img className="logo" id="logo" src="/PIT.png" alt="Logo" />

      <div className="actions">
        <Link className="btn" href="/lobby">
          Lobbies
        </Link>
        <Link className="btn btn-secondary" href="/profile">
          Profile
        </Link>
        <Logout />
      </div>
    </div>
  );
}

function LandingNotLoggedIn() {
  return (
    <div className="landingpage">
      <img className="logo" id="logo" src="/PIT.png" alt="Logo" />

      <div className="actions">
        <Link className="btn" href="/login">
          Login
        </Link>
        <Link className="btn btn-secondary" href="/create">
          Create account
        </Link>
      </div>
    </div>
  );
}

export default function Laptop() {
  const { isLoggedIn } = useView();

  return (
    <div className={styles.laptop}>
      <Image
        className={styles.laptopImage}
        src="/laptop.png"
        alt="laptop"
        width={2560}
        height={1440}
      />
      <div className={styles.screen}>
        {isLoggedIn ? <LandingLoggedIn /> : <LandingNotLoggedIn />}
      </div>
    </div>
  );
}
