"use client";

import { useState } from "react";
import {
  connectGitHub,
  connect42,
  disconnectGitHub,
  disconnect42,
  signout,
} from "./actions";
import { useRouter } from "next/navigation";

export function Logout() {
  return (
    <form action={signout}>
      <button type="submit">Log Out</button>
    </form>
  );
}

export function ConnectGitHub({ connected }: { connected: boolean }) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  if (!connected) {
    return (
      <form action={connectGitHub}>
        <button type="submit">Connect GitHub</button>
      </form>
    );
  }

  async function handleConfirm() {
    setIsDisconnecting(true);
    await disconnectGitHub();
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
        {isHovering ? "Disconnect GitHub" : "GitHub Connected"}
      </button>

      {showOverlay && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to disconnect GitHub?</p>
            <div className="delete-buttons">
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={handleConfirm}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? "Disconnecting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="btn-cancel-delete"
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

export function Connect42({ connected }: { connected: boolean }) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  if (!connected) {
    return (
      <form action={connect42}>
        <button type="submit">Connect 42</button>
      </form>
    );
  }

  async function handleConfirm() {
    setIsDisconnecting(true);
    await disconnect42();
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
        {isHovering ? "Disconnect 42" : "42 Connected"}
      </button>

      {showOverlay && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to disconnect 42?</p>
            <div className="delete-buttons">
              <button
                type="button"
                className="btn-confirm-delete"
                onClick={handleConfirm}
                disabled={isDisconnecting}
              >
                {isDisconnecting ? "Disconnecting..." : "Confirm"}
              </button>
              <button
                type="button"
                className="btn-cancel-delete"
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
