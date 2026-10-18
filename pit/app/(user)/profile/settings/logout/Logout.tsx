"use client";

import { signout } from "./actions";

export function Logout() {
  return (
    <form action={signout}>
      <button type="submit" className="logout-button">
        <img src="/icons/logout.png" alt="" className="logout-icon" />
        Log Out
      </button>
    </form>
  );
}
