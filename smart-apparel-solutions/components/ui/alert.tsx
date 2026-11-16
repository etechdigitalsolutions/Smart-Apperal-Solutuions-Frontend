import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "error" | "success";
}

export function Alert({ children, variant = "error", className = "", ...props }: AlertProps) {
  const classes = ["ui-alert", variant === "success" ? "ui-alert-success" : "ui-alert-error", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="alert" {...props}>
      {variant === "success" ? <CheckCircle2 size={17} aria-hidden /> : <AlertCircle size={17} aria-hidden />}
      <span>{children}</span>
    </div>
  );
}

export default Alert;
