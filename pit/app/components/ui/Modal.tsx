"use client";

import "./modal.css";
import { useEscape } from "@/app/lib/hooks/useEscape";
import { ReactNode, useId } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
  closable?: boolean;
  size?: "sm" | "md" | "lg";
};

export function Modal({
  title,
  onClose,
  children,
  closable = true,
  size = "sm",
}: ModalProps) {
  const titleId = useId();

  useEscape(onClose, closable);

  return createPortal(
    <div className="modal">
      <div
        className="modal-window"
        data-size={size}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId} className="modal-title">
          {title}
        </h2>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
