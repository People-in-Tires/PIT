'use client';

import "@/app/landingpage.css";

import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "../css/Laptop.module.css";
import Link from "next/link";

function LandingPage() {
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
  const isLoggedIn: boolean = false;// get from context

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
        <LandingPage/>
      </div>
    </div>
  );
}
