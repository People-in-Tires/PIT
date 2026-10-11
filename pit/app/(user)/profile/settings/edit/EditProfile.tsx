"use client";

import { useActionState, useEffect } from "react";
import { editProfile } from "./actions";
import { useRouter } from "next/navigation";
import { ALLOWED_AVATARS, DEFAULT_AVATAR } from "@/app/lib/avatars";

export type Profile = {
  username: string;
  name: string;
  email: string;
};

export function EditProfile({
  profile,
  onClose,
}: {
  profile: Profile;
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState(editProfile, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      onClose();
      router.refresh();
    }
  }, [state?.success, onClose, router]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form action={formAction}>
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            name="username"
            defaultValue={profile.username}
          />
          {state?.errors?.username && (
            <p className="edit-error">{state.errors.username[0]}</p>
          )}

          <label htmlFor="name">Full name: </label>
          <input id="name" name="name" defaultValue={profile.name} />

          <label htmlFor="email">Email: </label>
          <input id="email" name="email" defaultValue={profile.email} />
          {state?.errors?.email && (
            <p className="edit-error">{state.errors.email[0]}</p>
          )}
          {state?.message && <p className="edit-error">{state.message}</p>}

          <div className="modal-buttons">
            <button className="btn-confirm" type="submit" disabled={pending}>
              {pending ? "Saving.." : "Confirm"}
            </button>
            <button
              className="btn-cancel"
              type="button"
              onClick={onClose}
              disabled={pending}
            >
              {" "}
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
