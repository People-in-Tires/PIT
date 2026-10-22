"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { uploadAvatar } from "./actions";

const OK_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 2 * 1024 * 1024;

export function AvatarUpload({
  onUploaded,
}: {
  onUploaded: (image: string) => void;
}) {
  const [error, setError] = useState<string>();
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];
    if (!file) return;

    if (!OK_TYPES.includes(file.type) || file.size > MAX_BYTES) {
      setError("Use a PNG, JPG or WebP image under 2 MB.");
      input.value = "";
      return;
    }

    setError(undefined);
    const formData = new FormData();
    formData.append("avatar", file);

    startTransition(async () => {
      const result = await uploadAvatar(formData);
      if (result.error) {
        setError(result.error);
        input.value = "";
        return;
      }
      if (result.image) onUploaded(result.image);
      router.refresh();
    });
  }

  return (
    <div className="edit-upload">
      <label htmlFor="avatar-upload">Upload your own</label>
      <input
        id="avatar-upload"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
        disabled={pending}
      />
      {pending && <p>Uploading..</p>}
      {error && <p className="edit-error">{error}</p>}
    </div>
  );
}
