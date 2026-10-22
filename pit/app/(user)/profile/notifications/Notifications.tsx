"use client";

import "./notifications.css";
import { useState, useTransition } from "react";
import type { FriendRequest } from "./definitions";
import { useEscape } from "@/app/lib/hooks/useEscape";
import { Avatar } from "@/app/components/ui/Avatar";
import { acceptFriendRequest, declineFriendRequest } from "./actions";

type RequesterId = FriendRequest["requesterId"];

type NotificationsProps = {
  requests: FriendRequest[];
};

export function Notifications({ requests }: NotificationsProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEscape(() => setOpen(false), open);

  function respond(
    action: (id: RequesterId) => Promise<unknown>,
    requesterId: RequesterId,
  ) {
    startTransition(async () => {
      await action(requesterId);
    });
  }

  return (
    <div className="notifications">
      <button
        type="button"
        className="notifications-button"
        onClick={() => setOpen(!open)}
        aria-label={`Notifications (${requests.length})`}
        aria-expanded={open}
      >
        <img
          src="/icons/notifications.png"
          alt=""
          className="notifications-icon"
        />
        {requests.length > 0 && (
          <span className="notifications-badge">{requests.length}</span>
        )}
      </button>

      {open && (
        <>
          <div
            className="notifications-backdrop"
            onClick={() => setOpen(false)}
          />
          <div className="notifications-panel">
            <h2 className="notifications-title">Notifications</h2>

            {requests.length === 0 ? (
              <p className="notifications-empty">No new notifications.</p>
            ) : (
              <ul className="notifications-list">
                {requests.map((request) => (
                  <li key={request.requesterId} className="notifications-item">
                    <Avatar
                      image={request.requester.image}
                      className="notifications-avatar"
                    />
                    <p className="notifications-text">
                      <strong>{request.requester.username}</strong> wants to be
                      your friend
                    </p>
                    <div className="notifications-buttons">
                      <button
                        type="button"
                        className="notifications-accept"
                        disabled={isPending}
                        onClick={() =>
                          respond(acceptFriendRequest, request.requesterId)
                        }
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="notifications-decline"
                        disabled={isPending}
                        onClick={() =>
                          respond(declineFriendRequest, request.requesterId)
                        }
                      >
                        Decline
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
