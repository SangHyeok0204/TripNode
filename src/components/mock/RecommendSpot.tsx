interface RecommendSpotProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
  label?: string;
}

export function RecommendSpot({
  className = "",
  size = "md",
  pulse = true,
  label,
}: RecommendSpotProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`relative ${className}`}>
      {/* Pulse ring effect */}
      {pulse && (
        <div
          className={`
            absolute inset-0
            ${sizes[size]}
            rounded-full
            bg-accent-red/30
            animate-ping
          `}
        />
      )}
      {/* Main spot */}
      <div
        className={`
          relative
          ${sizes[size]}
          rounded-full
          bg-accent-red
          border-2 border-white
          shadow-md
          flex items-center justify-center
          ${pulse ? "animate-pulse-soft" : ""}
        `}
      >
        {label && (
          <span className="text-white text-xs font-bold">{label}</span>
        )}
      </div>
    </div>
  );
}
