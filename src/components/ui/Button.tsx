interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
    secondary:
      "bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 active:bg-primary-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
