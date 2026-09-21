"use client";

import "./login.css";
import { signin, signInWith42, signInWithGitHub } from "./actions";
import { goToPage } from "@/app/actions/nav";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");
  const oauthErrorMessage = 
    oauthError === "Configuration"
    ? "OAuth login error: No linked account. Create an account first."
    : null;

  return (
    <div className="login-container">
      <img className="logo" id="logo" src="/PIT.png" alt="Logo" />
      <h1 className="login-title">Login</h1>

      <form action={action} className="login-form">
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
        {oauthErrorMessage && <p className="error">{oauthErrorMessage}</p>}
        <button className="login-button" disabled={pending} type="submit">
          Enter the PIT
        </button>
      </form>
      <form action={signInWith42}>
        <button type="submit" className="forgot-password">
          Continue with 42
        </button>
      </form>
      <form action={signInWithGitHub}>
        <button type="submit" className="forgot-password">
          Continue with GitHub
        </button>
      </form>
      <div id="create-account">
        No account?
        <button
          type="button"
          className="forgot-password"
          onClick={() => goToPage("/create")}
        >
          Create Account
        </button>
      </div>
      <div id="forgot-password" className="forgot-password">
        <button 
          type="button"
          className="forgot-password"
          onClick={() => goToPage("/forgot-password")}
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
}
