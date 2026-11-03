import type { HTMLAttributes, ReactNode } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export function Badge({ children, ...props }: BadgeProps) {
  return <span {...props}>{children}</span>;
}

export default Badge;
