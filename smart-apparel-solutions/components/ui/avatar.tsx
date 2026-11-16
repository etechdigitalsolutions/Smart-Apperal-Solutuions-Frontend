import type { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string | null;
  size?: "sm" | "lg";
}

export function Avatar({ name, src, size = "sm", className = "", ...props }: AvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "U";
  const classes = ["account-avatar", size === "lg" ? "large" : "", className].filter(Boolean).join(" ");

  return (
    <div className={classes} aria-hidden={!src} {...props}>
      {src ? <img src={src} alt="" /> : initial}
    </div>
  );
}

export default Avatar;
