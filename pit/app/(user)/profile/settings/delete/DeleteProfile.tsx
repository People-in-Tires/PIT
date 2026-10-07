"use client";

import { useState } from "react";
import { deleteProfile } from "./actions";

export function DeleteProfile({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const canConfirm = inputValue === "delete";

  async function handleConfirm() {
    if (!canConfirm) return;
    setIsDeleting(true);
    await deleteProfile();
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>
          Are you sure you want to delete your profile? Type &quot;delete&quot;
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
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
