"use client";

import "./delete.css";
import { useState, useTransition } from "react";
import { deleteProfile } from "./actions";
import { Modal } from "@/app/components/ui/Modal";

const CONFIRM_WORD = "delete";

export function DeleteProfile({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const canConfirm = inputValue === CONFIRM_WORD;

  async function handleConfirm() {
    if (!canConfirm) return;
    startTransition(async () => {
      await deleteProfile();
    });
  }

  return (
    <Modal title="Delete profile" onClose={onClose} closable={!isPending}>
      <p className="delete warning">
        This removes your profile, friends and match history for good. This
        can&apos;t be undone!
      </p>

      <div className="delete-field">
        <label htmlFor="delete-confirm">
          Type &quot;{CONFIRM_WORD}&quot; to confirm
        </label>
        <input
          id="delete-confirm"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoComplete="off"
          autoFocus
        />
      </div>

      <div className="modal-actions">
        <button
          type="button"
          className="delete-cancel"
          onClick={onClose}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="button"
          className="delete-submit"
          onClick={handleConfirm}
          disabled={!canConfirm || isPending}
        >
          {isPending ? "Deleting" : "Delete profile"}
        </button>
      </div>
    </Modal>
  );
}
