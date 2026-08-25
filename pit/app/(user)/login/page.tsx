"use client";

import { signin } from "@/app/actions/auth";
import { goToPage } from "@/app/actions/nav";
import { useActionState } from "react";
import "./login.css";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);

  return (
    <div className="flex items-center flex-col">
      <img className="size-100" id="logo" src="/PIT.png" alt="Logo" />
      <h1 className="text-5xl/25">Login</h1>
      {state?.success && goToPage("/profile")}
      <form action={action} className="text-2xl flex items-center flex-col">
        <div>
          <label htmlFor="login">Login: </label>
          <input id="login" name="login" placeholder="username or email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
          />
        </div>
        {state?.message && <p className="error">{state.message}</p>}
        <button className="login" disabled={pending} type="submit">
          Enter the PIT
        </button>
        <div id="forgot-password">
          Don`&apost have an account?
          <button
            type="button"
            className="forgot-password"
            onClick={() => goToPage("/create")}
          >
            Create Account
          </button>
        </div>
        <div id="forgot-password" className="forgot-password">
          <button type="button">Forgot Password</button>
        </div>
      </form>
    </div>
  );
}
