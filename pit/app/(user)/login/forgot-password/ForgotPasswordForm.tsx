"use client";

import "./forgot-password.css";
import { useActionState, useState } from "react";
import { resetPassword } from "./actions";

export function ForgotPassword() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [state, formAction, pending] = useActionState(resetPassword, undefined);

  const step = state?.step ?? "login";

  function handleClose() {
    setShowOverlay(false);
  }

  return (
    <>
      <button type="button" onClick={() => setShowOverlay(true)}>
        Forgot Password
      </button>
      {showOverlay && (
        <div className="forgot-password-overlay">
          <div className="forgot-password-modal">
            {step === "done" ? (
              <>
                <p>Your password has been changed. You can now log in.</p>
                <button type="button" onClick={handleClose}>
                  Close
                </button>
              </>
            ) : (
              <form action={formAction}>
                <input type="hidden" name="step" value={step} />
                {step !== "login" && (
                  <input
                    type="hidden"
                    name="login"
                    value={state?.login ?? ""}
                  />
                )}
                {step === "password" && (
                  <input type="hidden" name="code" value={state?.code ?? ""} />
                )}

                {step === "login" && (
                  <>
                    <label htmlFor="login-input">Username or email: </label>
                    <input
                      id="login-input"
                      name="login"
                      placeholder="username or email"
                    />
                  </>
                )}

                {step === "code" && (
                  <>
                    <p>We sent a 6-digit code to your email.</p>
                    <label htmlFor="code-input">Code: </label>
                    <input
                      id="code-input"
                      name="code"
                      inputMode="numeric"
                      maxLength={6}
                    />
                  </>
                )}

                {step === "password" && (
                  <>
                    <label htmlFor="password">New password: </label>
                    <input id="password" name="password" type="password" />
                    <label htmlFor="confirm">Repeat password: </label>
                    <input id="confirm" name="confirm" type="password" />
                  </>
                )}

                {state?.message && <p className="error">{state.message}</p>}

                <button type="submit" disabled={pending}>
                  {pending ? "Checking..." : "Confirm"}
                </button>
                <button type="button" onClick={handleClose} disabled={pending}>
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
