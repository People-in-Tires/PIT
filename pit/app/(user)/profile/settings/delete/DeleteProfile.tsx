"use client";

import { useState } from "react";
import { deleteProfile } from "./actions";

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
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Are you sure you want to delete your profile? Type
              &quot;delete&quot;
            </p>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />

            <div className="modal-buttons">
              <button
                type="button"
                className="btn-confirm"
                onClick={handleConfirm}
                disabled={!canConfirm || isDeleting}
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="btn-cancel"
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
