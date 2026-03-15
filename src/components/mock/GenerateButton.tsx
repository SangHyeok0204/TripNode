interface GenerateButtonProps {
  className?: string;
  size?: "sm" | "md";
}

export function GenerateButton({
  className = "",
  size = "md",
}: GenerateButtonProps) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <div
      className={`
        ${sizes[size]}
        inline-flex items-center gap-1.5
        bg-primary-500 text-white
        rounded-lg font-medium
        shadow-sm
        ${className}
      `}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <span>생성</span>
    </div>
  );
}
