interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "gray" | "primary-light";
}

export function SectionWrapper({
  children,
  className = "",
  id,
  background = "white",
}: SectionWrapperProps) {
  const backgrounds = {
    white: "bg-white",
    gray: "bg-gray-50",
    "primary-light": "bg-primary-50",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${backgrounds[background]} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
