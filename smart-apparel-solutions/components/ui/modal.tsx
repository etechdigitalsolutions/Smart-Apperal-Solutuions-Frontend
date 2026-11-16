"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  actions?: ReactNode;
}

export function Modal({ open, title, children, onClose, actions }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ui-dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="ui-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ui-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="ui-dialog-title">{title}</h2>
        {children}
        {actions ? <div className="ui-dialog-actions">{actions}</div> : null}
      </div>
    </div>
  );
}

export default Modal;
