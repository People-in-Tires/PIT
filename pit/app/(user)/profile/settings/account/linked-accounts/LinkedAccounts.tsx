"use client";

import "./linked-accounts.css";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LinkedAccountStatus } from "./definitions";
import { connect42, connectGitHub, disconnect42, disconnectGitHub } from "./actions";

export function LinkedAccounts({ linkedAccounts }: { linkedAccounts: LinkedAccountStatus }) {
  return (
    <ul className="linked-list">
      <LinkedAccount
        label="GitHub"
        connected={linkedAccounts.github}
        connect={connectGitHub}
        disconnect={disconnectGitHub}
      />
      <LinkedAccount
        label="42"
        connected={linkedAccounts.fortyTwo}
        connect={connect42}
        disconnect={disconnect42}
      />
    </ul>
  );
}

type LinkedAccountProps = {
  label: string;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

function LinkedAccount({ label, connected, connect, disconnect } : LinkedAccountProps) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDisconnect() {
    startTransition(async () => {
      await disconnect();
      setConfirming(false);
    });
  }

  return (
    <li className="linked-row">
      <span className="linked-name">{label}</span>

      {!connected ? (
        <form action={connect}>
          <button type="submit" className="linked-connect">
            Connect
          </button>
        </form>
      ) : confirming ? (
        <div className="linked-actions">
          <span className="linked-question">Disconnect {label}?</span>
          <button
            type="button"
            className="linked-cancel"
            onClick={() => setConfirming(false)}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="button"
            className="linked-disconnect"
            onClick={handleDisconnect}
            disabled={isPending}
          >
            {isPending ? "Disconnecting..." : "Disconnect"}
          </button>
        </div>
      ) : (
        <div className="linked-actions">
          <span className="linked-badge">Connected</span>
          <button type="button" className="linked-remove" onClick={() => setConfirming(true)}>
            Disconnect
          </button>
        </div>
      )}
    </li>
  );
}
