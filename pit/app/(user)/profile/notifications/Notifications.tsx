"use client";

import "./notifications.css";
import { useState } from "react";
import type { FriendRequest } from "./definitions";
import { acceptFriendRequest, declineFriendRequest } from "./actions";

export function Notifications({ requests }: { requests: FriendRequest[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>🔔 {requests.length}</button>

      {isOpen && (
        <ul>
          {requests.map((request) => (
            <li key={`${request.requesterId}-${request.receiverId}`}>
              {request.requester.username} wants to be your friend
              <button onClick={() => acceptFriendRequest(request.requesterId, request.receiverId)}>
                Accept
              </button>
              <button onClick={() => declineFriendRequest(request.requesterId, request.receiverId)}>
                Decline
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
