"use client";

import "./logout.css"
import { signout } from "./actions";

export function Logout() {
  return (
    <form action={signout}>
      <button type="submit" className="logout-button">
        Log Out
        <img src="/icons/logout.png" alt="" className="logout-icon" />
      </button>
    </form>
  );
}
