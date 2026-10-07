"use client";

import "./logout.css";
import { signout } from "./actions";

export function Logout() {
  return (
    <form action={signout}>
      <button type="submit" className="logout-button">
        Log Out <img src="/logout-icon.png" alt="" width={18} height={18} />
      </button>
    </form>
  );
}
