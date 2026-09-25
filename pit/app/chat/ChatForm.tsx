"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { postMessage, getMessages } from "./actions";
import { ChatMessage } from "./definitions";
import "./chat.css";

export default function ChatForm({ currentUserId }: { currentUserId: string }) {
  const [state, formAction, pending] = useActionState(postMessage, undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  // Ophalen + herhalen elke 2s
  useEffect(() => {
    let cancelled = false;

    async function load() {
      const data = await getMessages();
      if (!cancelled) setMessages(data);
    }

    load();
    const interval = setInterval(load, 2000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // Formulier leegmaken + meteen verversen na een succesvol bericht
  useEffect(() => {
    if (state?.timestamp) {
      formRef.current?.reset();
      getMessages().then(setMessages);
    }
  }, [state?.timestamp]);

  return (
    <div className="chat-container">
      <div className="chat-log">
        {[...messages].reverse().map((m) => (
          <div key={m.id} className={m.user.username === undefined ? "" : "chat-message"}>
            <span className="chat-username">{m.user.username ?? "Unknown"}</span>
            <span className="chat-time">
              {new Date(m.createdAt).toLocaleTimeString("nl-NL", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <p className="chat-content">{m.content}</p>
          </div>
        ))}
      </div>

      <form action={formAction} ref={formRef} className="chat-form">
        <input
          type="text"
          name="content"
          placeholder="Type a message..."
          maxLength={500}
          required
        />
        <button type="submit" disabled={pending}>
          Send
        </button>
      </form>
      {state?.message && <p className="chat-error">{state.message}</p>}
    </div>
  );
}