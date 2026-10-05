"use client";

import "./chat.css";
import { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatForm from "@/app/chat/ChatForm";

export default function ChatWidget({
  currentUserId,
}: {
  currentUserId: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-widget-panel">
          <ChatForm currentUserId={currentUserId} />
        </div>
      )}
      <button
        className="chat-widget-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
      >
        <ChatIcon />
      </button>
    </div>
  );
}
