"use client";

import "./edit.css";
import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "./actions";
import { useRouter } from "next/navigation";

type Profile = {
  username: string;
  name: string;
  email: string;
  image: string | null;
};

export function EditProfile({ profile }: { profile: Profile }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [state, formAction, pending] = useActionState(updateProfile, undefined);
  const router = useRouter();
  const [lastHandledTimestamp, setLastHandledTimestamp] = useState<
    number | undefined
  >(undefined);

  if (state?.success && state.timestamp !== lastHandledTimestamp) {
    setLastHandledTimestamp(state.timestamp);
    setShowOverlay(false);
  }

  useEffect(() => {
    if (state?.success) {
      router.refresh();
    }
  }, [state?.timestamp, router]);

  return (
    <>
      <button type="button" onClick={() => setShowOverlay(true)}>
        Edit Profile
      </button>
      {showOverlay && (
        <div className="edit-overlay">
          <div className="edit-modal">
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
              <button type="submit" disabled={pending}>
                {pending ? "Saving.." : "Confirm"}
              </button>
              <button
                type="button"
                onClick={() => setShowOverlay(false)}
                disabled={pending}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
