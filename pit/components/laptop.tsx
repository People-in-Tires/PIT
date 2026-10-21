import styles from "../css/Laptop.module.css";
import "../css/Laptop.module.css";

import Image from "next/image";
import Link from "next/link";

import { useView } from "./engine/ViewManager";
import { Logout } from "@/app/(user)/profile/settings/logout/Logout";
import { CSSProperties, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

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

export function LaptopButton({ style }: { style: CSSProperties }) {
  return (
    <Link
      style={{
        ...style,
        position: "absolute",
        height: "9cqw",
        width: "16cqw",
        backgroundColor: "black",
      }}
      href={"/profile"}
    >
      <Image
        src={"/backgrounds/laptop.svg"}
        height={900}
        width={1600}
        alt="laptop"
      />
    </Link>
  );
}
