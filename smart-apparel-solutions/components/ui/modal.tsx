import type { HTMLAttributes, ReactNode } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Modal({ children, ...props }: ModalProps) {
  return <div {...props}>{children}</div>;
}

export default Modal;
