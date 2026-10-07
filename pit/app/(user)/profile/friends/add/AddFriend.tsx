"use client";

import "../../modal.css";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
        Add friend
      </button>
      {open && <AddFriend onClose={() => setOpen(false)} />}
    </>
  );
}

function AddFriend({ onClose }: { onClose: () => void }) {
  const [state, formAction, pending] = useActionState(addFriend, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.timestamp) router.refresh();
  }, [state?.timestamp, router]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form action={formAction}>
          <label htmlFor="identifier">Username or email: </label>
          <input
            id="identifier"
            name="identifier"
            autoComplete="off"
            defaultValue={state?.values?.identifier}
          />
          {state?.errors?.identifier && (
            <p className="modal-error">{state.errors.identifier[0]}</p>
          )}
          {state?.message && <p className="modal-message">{state.message}</p>}
          {state?.success && <p className="modal-success">{state.success}</p>}

          <div className="modal-buttons">
            <button className="btn-confirm" type="submit" disabled={pending}>
              {pending ? "Sending.." : "Send"}
            </button>
            <button
              className="btn-cancel"
              type="button"
              onClick={onClose}
              disabled={pending}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
