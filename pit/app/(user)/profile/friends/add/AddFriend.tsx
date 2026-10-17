"use client";

import "./add-friend.css"
import { useActionState, useState } from "react";
import { Modal } from "@/app/components/ui/Modal";
import { addFriend } from "./actions";

export function AddFriendButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="add-friend-button"
        onClick={() => setOpen(true)}
      >
        <img src="/icons/add.png" alt="" className="add-friend-icon" />
      </button>
      {open && <AddFriendModal onClose={() => setOpen(false)} />}
    </>
  );
}

function AddFriendModal({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(addFriend, undefined);

  return (
    <Modal title="Add friend" onClose={onClose} closable={!pending}>
      <form action={formAction} className="add-friend-form" key={state?.timestamp}>
        <div className="add-friend-field">
          <label htmlFor="add-friend-identifier">Username or email</label>
          <input
            id="add-friend-identifier"
            name="identifier"
            autoComplete="off"
            autoFocus
            defaultValue={state?.values?.identifier}
          />
          {state?.errors?.identifier && (
            <p className="add-friend-error" >{state.errors.identifier[0]}</p>
          )}
        </div>

        {state?.message && <p className="add-friend-message">{state.message}</p>}
        {state?.success && <p className="add-friend-success">{state.success}</p>}

        <div className="modal-actions">
          <button type="button" className="add-friend-close" onClick={onClose} disabled={pending}>
            Cancel
          </button>
          <button type="submit" className="add-friend-submit" disabled={pending}>
            {pending ? "Sending" : "Send request"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
