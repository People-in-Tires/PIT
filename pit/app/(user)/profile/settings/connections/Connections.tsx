"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConnectionButton({
  label,
  connected,
  connect,
  disconnect,
}: {
  label: string;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  if (!connected) {
    return (
      <form action={connect}>
        <button type="submit">Connect {label}</button>
      </form>
    );
  }

  async function handleConfirm() {
    setIsDisconnecting(true);
    await disconnect();
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        className="connected"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setShowOverlay(true)}
      >
        {isHovering ? '"Disconnect ${label}"' : '"${label} Connected"'}
      </button>

      {showOverlay && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to disconnect {label}?</p>
            <div className="modal-buttons">
              <button
                type="button"
                className="btn-confirm"
                onClick={handleConfirm}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? "Disconnecting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setShowOverlay(false)}
                disabled={isDisconnecting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
