"use client";

import "./edit.css";
import { useActionState, useEffect } from "react";
import { editProfile } from "./actions";
import { useRouter } from "next/navigation";

export type Profile = {
  username: string;
  name: string;
  email: string;
  image: string | null;
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
          <label htmlFor="name">Full name: </label>
          <input id="name" name="name" defaultValue={profile.name} />
          <label htmlFor="email">Email: </label>
          <input id="email" name="email" defaultValue={profile.email} />
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
