import type { HTMLAttributes, ReactNode } from "react";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Toast({ children, ...props }: ToastProps) {
  return <div {...props}>{children}</div>;
}

export default Toast;
