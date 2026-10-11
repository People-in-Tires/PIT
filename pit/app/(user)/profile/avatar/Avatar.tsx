"use client";

import { ALLOWED_AVATARS, DEFAULT_AVATAR } from "@/app/lib/avatars";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { updateAvatar } from "./actions";

export function ChooseAvatar({ image }: { image: string | null }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const current = image ?? DEFAULT_AVATAR;

  function choose(file: string) {
    startTransition(async () => {
      const result = await updateAvatar(file);
      if (result.error) {
        setError(result.error);
        return;
      }
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button type="button" className="avatar-trigger" onClick={() => setOpen(true)}>
        <img src={`/avatars/${current}`} alt="Change avatar" />
        <span className="avatar-trigger-hint">Change</span>
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="avatar-grid">
              {ALLOWED_AVATARS.map((file) => (
                <button
                key={file}
                type="button"
                className={`avatar-option ${file === current ? "selected" : ""}`}
                onClick={() => choose(file)}
                disabled={pending}
                >
                  <img src={`/avatars/${file}`} alt={file} />
                </button>
              ))}
            </div>
            {error && <p className="edit-error"></p>}

            <button type="button" className="btn-cancel" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}