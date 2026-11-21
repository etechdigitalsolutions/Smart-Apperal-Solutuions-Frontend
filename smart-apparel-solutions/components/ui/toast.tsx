import type { HTMLAttributes, ReactNode } from "react";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "success";
}

export function Toast({ children, variant = "default", className = "", role = "status", ...props }: ToastProps) {
  const classes = ["ui-toast", variant === "success" ? "ui-toast-success" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role={role} {...props}>
      {children}
    </div>
  );
}

export default Toast;
