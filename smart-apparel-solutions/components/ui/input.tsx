import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  trailing?: ReactNode;
}

export function Input({
  id,
  label,
  error,
  hint,
  icon,
  trailing,
  className = "",
  ...props
}: InputProps) {
  const fieldId = id ?? props.name;
  const describedBy = error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined;

  return (
    <div className={`auth-field${error ? " is-invalid" : ""}`}>
      {label && fieldId ? <label htmlFor={fieldId}>{label}</label> : null}
      <div className="auth-input-wrap">
        {icon ? <span className="auth-field-icon">{icon}</span> : null}
        <input
          id={fieldId}
          className={`auth-field-input ${className}`.trim()}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {trailing ? <span className="auth-field-trailing">{trailing}</span> : null}
      </div>
      {error ? (
        <p id={`${fieldId}-error`} className="auth-field-error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="auth-field-hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
