"use client";

import "./change-password.css";
import { useState } from "react";

export function ChangePassword() {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setShowOverlay(true)}>
        Change Password
      </button>
      {showOverlay && (
        <div className="edit-overlay">
          <div className="edit-modal">
            <form>
              <label htmlFor="currentPassword">Current password: </label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                placeholder="********"
              />
              <label htmlFor="password">New password: </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
              />
              <label htmlFor="password2">Confirm new password: </label>
              <input
                id="password2"
                name="password2"
                type="password"
                placeholder="********"
              />
              <button type="submit">Confirm</button>
              <button type="button" onClick={() => setShowOverlay(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}