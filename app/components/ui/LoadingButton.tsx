import Spinner from "./Spinner";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary";
}

export default function LoadingButton({
  loading = false,
  loadingText,
  variant = "primary",
  children,
  disabled,
  className = "",
  type = "button",
  ...props
}: LoadingButtonProps) {
  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${baseClass} ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
