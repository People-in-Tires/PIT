"use client";

import "./forgot-password.css";
import { useActionState, useEffect, useState } from "react";
import { resetPassword } from "./actions";

const STEP_NUMBER = { login: 1, code: 2, password: 3 } as const;

const SUBMIT_LABEL = {
  login: "Send code",
  code: "Check code",
  password: "Save password",
} as const;

export function ForgotPassword() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="forgot-trigger" onClick={() => setOpen(true)}>
        Forgot password?
      </button>
      {open && <ForgotPasswordModal onClose={() => setOpen(false)} />}
    </>
  );
}

function ForgotPasswordModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(resetPassword, undefined);
  const step = state?.step ?? "login";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, pending]);

  return (
    <div className="forgot-overlay">
      <div
        className="forgot-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="forgot-title"
      >
        <h2 id="forgot-title" className="forgot-banner">
          Reset your password
        </h2>

        <div className="forgot-body">
          {step === "done" ? (
          <>
            <p className="succes">Password changed</p>
            <p className="forgot-text">You can now log in with you new password.</p>
            <button type="button" className="forgot-confirm" onClick={onClose}>
              Back to login
            </button>
          </>
        ) : (
          <form action={formAction} className="forgot-form">
            <p className="forgot-step">Step {STEP_NUMBER[step]} of 3</p>

            <input type="hidden" name="step" value={step} />
            {step !== "login" && (
              <input type="hidden" name="login" value={state?.login ?? ""} />
            )}
            {step === "password" && (
              <input type="hidden" name="code" value={state?.code ?? ""} />
            )}

            {step === "login" && (
              <>
                <p className="forgot-text">
                  Enter your username or email and we'll send you a 6-digit code.
                </p>
                <div className="forgot-field">
                  <label htmlFor="forgot-login">Username or email</label>
                  <input
                    id="forgot-login"
                    name="login"
                    autoComplete="username"
                    autoFocus/>
                </div>
              </>
            )}

            {step === "code" && (
              <>
                <p className="forgot-text">
                  If an account exists for this username or email, we sent a 6-digit code to its address.
                </p>
                <div className="forgot-field">
                  <label htmlFor="code-input">Code</label>
                  <input
                    id="forgot-code"
                    name="code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    autoFocus
                  />
                </div>
              </>
            )}

            {step === "password" && (
              <>
                <div className="forgot-field">
                  <label htmlFor="forgot-password">New password</label>
                  <input
                    id="forgot-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    autoFocus
                  />
                </div>
                <div className="forgot-field">
                  <label htmlFor="forgot-confirm">Repeat password</label>
                  <input
                    id="forgot-confirm"
                    name="confirm"
                    type="password"
                    autoComplete="new-password"
                  />
                </div>
              </>
            )}

            {state?.message && <p className="error">{state.message}</p>}
            {state?.errors && (
              <ul className="error">
                {state.errors.map((e) => (
                  <li key={e}>- {e}</li>
                ))}
              </ul>
            )}

            <div className="forgot-actions">
              <button
                type="button"
                className="forgot-cancel"
                onClick={onClose}
                disabled={pending}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="forgot-confirm"
                disabled={pending}
              >
                {pending ? "Checking..." : SUBMIT_LABEL[step]}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  </div>
  );
}
