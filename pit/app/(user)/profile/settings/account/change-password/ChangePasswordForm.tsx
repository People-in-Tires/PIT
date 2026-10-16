"use client";

import "./change-password.css"
import { useActionState } from "react";
import { changePassword } from "./actions";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(changePassword, undefined);

  return (
    <form action={formAction} className="password-form">
      <div className="password-field">
        <label htmlFor="password-current">Current password</label>
        <input
          id="password-current"
          name="currentPassword"
          type="password"
          autoComplete="current-password"
        />
        {state?.errors?.currentPassword && (
          <p className="password-error">{state.errors.currentPassword[0]}</p>
        )}
      </div>

      <div className="password-field">
        <label htmlFor="password-new">New password</label>
        <input
          id="password-new"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        {state?.errors?.password && (
          <p className="password-error">{state.errors.password[0]}</p>
        )}
      </div>

      <div className="password-field">
        <label htmlFor="password-repeat">Confirm new password</label>
        <input
          id="password-repeat"
          name="password2"
          type="password"
          autoComplete="new-password"
        />
        {state?.errors?.password2 && (
          <p className="password-error">{state.errors.password2[0]}</p>
        )}
      </div>

      {state?.message && <p className="password-error">{state.message}</p>}
      {state?.success && <p className="password-success">Password changed.</p>}

      <button type="submit" className="password-submit" disabled={pending}>
        {pending ? "Saving..." : "Change password"}
      </button>
    </form>
  );
}
