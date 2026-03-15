interface NodeMarkerProps {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "base" | "selected";
}

export function NodeMarker({
  label,
  className = "",
  size = "md",
  variant = "base",
}: NodeMarkerProps) {
  const sizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const variants = {
    base: "bg-primary-500 border-primary-600",
    selected: "bg-primary-600 border-primary-700 ring-2 ring-primary-300",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        ${variants[variant]}
        rounded-full border-2
        flex items-center justify-center
        text-white font-bold shadow-md
        ${className}
      `}
    >
      {label}
    </div>
  );
}
