import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from "../css/Laptop.module.css";

const laptopPageShortcuts = {
  login: "/login",
  stats: "/stats",
  create: "/create",
  achievements: "/achievements",
} as const;

export default function Laptop() {
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
        <iframe
          src={laptopPageShortcuts["create"]}
          title={"laptopScreen"}
        ></iframe>
      </div>
    </div>
  );
}
