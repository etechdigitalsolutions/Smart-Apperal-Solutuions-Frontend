import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "danger-outline" | "white";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  block?: boolean;
  loading?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  outline: "btn-outline",
  danger: "btn-danger",
  "danger-outline": "btn-danger-outline",
  white: "btn-white",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  block = false,
  loading = false,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = ["btn", variantClass[variant], block ? "btn-block" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
