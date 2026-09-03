"use client";

import { useState } from "react";
import { deleteProfile } from "../actions";

export function DeleteProfile() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const canConfirm = inputValue === "delete";

  async function handleConfirm() {
    if (!canConfirm) return;
    setIsDeleting(true);
    await deleteProfile();
  }

  function handleCancel() {
    setShowOverlay(false);
    setInputValue("");
  }

  return (
    <>
      <button type="button" onClick={() => setShowOverlay(true)}>
        Delete Profile
      </button>

      {showOverlay && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete your profile? Type "delete"</p>

            <input
              type="text"
              className="delete-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />

            <div className="delete-buttons">
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={handleConfirm}
                disabled={!canConfirm || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="btn-cancel-delete"
                onClick={handleCancel}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
