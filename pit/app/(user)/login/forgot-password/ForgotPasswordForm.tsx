"use client";

import "./forgot-password.css";
import { useActionState, useState } from "react";
import { requestPasswordReset } from "./actions";

export function ForgotPassword() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [state, formAction, pending] = useActionState(
    requestPasswordReset,
    undefined,
  );

  return (
    <>
      <button type="button" onClick={() => setShowOverlay(true)}>
        Forgot Password
      </button>
      {showOverlay && (
        <div className="forgot-password-overlay">
          <div className="forgot-password-modal">
            <form action={formAction}>
              <label htmlFor="login">Username or email: </label>
              <input id="login" name="login" placeholder="username or email" />
              {state?.message && <p className="error">{state.message}</p>}
              <button type="submit" disabled={pending}>
                {pending ? "Checking..." : "Continue"}
              </button>
              <button
                type="button"
                onClick={() => setShowOverlay(false)}
                disabled={pending}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
