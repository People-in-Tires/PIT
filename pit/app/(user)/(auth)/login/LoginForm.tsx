"use client";

import "./login.css";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { signin, signInWith42, signInWithGitHub } from "./actions";
import { ForgotPassword } from "./forgot-password/ForgotPasswordForm";

const OAUTH_ERRORS: Record<string, string> = {
  Configuration:
    "No linked account found. Create an account first, then link 42 or GitHub from you profile",
};

export default function LoginForm({ oauthError }: { oauthError?: string }) {
  const [state, action, pending] = useActionState(signin, undefined);

  useEffect(() => {
    if (oauthError) {
      window.history.replaceState(null, "", "/login");
    }
  }, [oauthError]);

  const oauthMessage =
    oauthError && !state
      ? (OAUTH_ERRORS[oauthError] ??
        "Something went wrong with that linked account. Please try again.")
      : null;

  return (
    <div className="login-page">
      <header className="login-header">
        <img className="login-logo" src="/PIT.png" alt="PIT Logo" />
      </header>

      <div className="login-card">
        <p className="login-banner">Welcome back to the pit</p>

        <div className="login-columns">
          <div className="login-credentials">
            <p className="login-column-title">Your login</p>
            <form action={action} className="login-form" key={state?.timestamp}>
              <div className="login-field">
                <label htmlFor="login">Username or email </label>
                <input
                  id="login"
                  name="login"
                  defaultValue={state?.values?.login ?? ""}
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">Password </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                />
              </div>

              {state?.message && <p className="error">{state.message}</p>}

              <button className="login-button" disabled={pending} type="submit">
                {pending ? "Entering" : "Enter the PIT"}
              </button>
            </form>

            <div className="login-forgot">
              <ForgotPassword />
            </div>
          </div>

          <div className="login-linked">
            <p className="login-column-title">Linked account</p>
            <p className="login-linked-text">
              Linked 42 or GitHub on your profile? Use it to log in here.
            </p>

            <form action={signInWith42}>
              <button className="login-oauth" type="submit">
                Continue with 42
              </button>
            </form>

            <form action={signInWithGitHub}>
              <button className="login-oauth" type="submit">
                Continue with GitHub
              </button>
            </form>

            {oauthMessage && <p className="error">{oauthMessage}</p>}
          </div>
        </div>

        <p className="login-footer">
          New here? <Link href="/create">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
