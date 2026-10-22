"use client";

import "../../modal.css";
import "../remove/remove.css";
import { useState, useTransition } from "react";
import { removeFriend } from "./actions";
import { Modal } from "@/app/components/ui/Modal";

export function RemoveFriendButton({
  friendId,
  username,
}: {
  friendId: string;
  username: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      await removeFriend(friendId);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        type="button"
        className="friends-remove"
        aria-label={`Remove ${username}`}
        onClick={() => setOpen(true)}
      >
        <img src="/icons/remove.png" alt="" className="friends-remove-icon" />
      </button>
      
      {open && (
        <Modal
          title="Remove friend"
          onClose={() => setOpen(false)}
          closable={!pending}
        >
          <p>
            Remove <strong>{username}</strong> as a friend?
          </p>
          <p>You are no longer friends after this.</p>
          <div className="modal-actions">
            <button
              type="button"
              className="remove-cancel"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="button"
              className="remove-submit"
              onClick={handleConfirm}
              disabled={pending}
            >
              {pending ? "Removing" : "Remove"}
            </button>
          </div>
          
        </Modal>
      )}
    </>
  );
}