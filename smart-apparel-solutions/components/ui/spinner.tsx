interface SpinnerProps {
  size?: number;
  className?: string;
  label?: string;
}

export function Spinner({ size = 18, className = "", label = "Loading" }: SpinnerProps) {
  return (
    <span
      className={`loading-orb ${className}`.trim()}
      role="status"
      aria-label={label}
      style={{ width: size, height: size, borderWidth: 2 }}
    />
  );
}

export default Spinner;
