"use client";

import { signout } from "./actions";

export function Logout() {
  return (
    <form action={signout}>
      <button type="submit">Log Out</button>
    </form>
  );
}
