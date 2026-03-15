interface RouteLineProps {
  className?: string;
  variant?: "solid" | "dashed";
  direction?: "horizontal" | "vertical" | "diagonal";
  length?: string;
}

export function RouteLine({
  className = "",
  variant = "solid",
  direction = "horizontal",
  length = "100px",
}: RouteLineProps) {
  const variants = {
    solid: "border-solid",
    dashed: "border-dashed",
  };

  const directions = {
    horizontal: "border-t-2 h-0",
    vertical: "border-l-2 w-0",
    diagonal: "border-t-2 h-0 rotate-45 origin-left",
  };

  const style =
    direction === "vertical" ? { height: length } : { width: length };

  return (
    <div
      className={`
        ${variants[variant]}
        ${directions[direction]}
        border-primary-400
        ${className}
      `}
      style={style}
    />
  );
}
