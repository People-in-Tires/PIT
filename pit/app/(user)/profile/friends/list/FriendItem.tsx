"use client";

import { useState, useTransition } from "react";
import { Avatar } from "@/app/components/ui/Avatar";
import { Modal } from "@/app/components/ui/Modal";
import { removeFriend } from "../remove/actions";

type Friend = {
  id: string;
  username: string;
  image: string;
  online: boolean;
};

export function FriendItem({ friend }: { friend: Friend }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleRemove() {
    startTransition(async () => {
      await removeFriend(friend.id);
      setOpen(false);
    });
  }

  return (
    <li className="friends-item">
      <button
        type="button"
        className="friends-open"
        onClick={() => setOpen(true)}
      >
        <Avatar image={friend.image} className="friends-avatar" />
        <span className="friends-username">{friend.username}</span>
      </button>

      <span
        className={friend.online ? "friends-status-online" : "friends-status"}
      >
        {friend.online ? "Online" : "Offline"}
      </span>

      {open && (
        <Modal
          title={friend.username}
          onClose={() => setOpen(false)}
          closable={!pending}
        >
          <p>
            Remove <strong>{friend.username}</strong> as a friend? You&apos;ll
            need to send a new request to become friends again.
          </p>
          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel"
              onClick={() => setOpen(false)}
              disabled={pending}
            >
              Cancel
            </button>
            <button
              type="button"
              className="modal-danger"
              onClick={handleRemove}
              disabled={pending}
            >
              {pending ? "Removing" : "Remove friend"}
            </button>
          </div>
        </Modal>
      )}
    </li>
  );
}
