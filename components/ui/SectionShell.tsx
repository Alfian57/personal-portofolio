import { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  asset?: ReactNode;
  className?: string;
  contentClassName?: string;
  maxWidth?: "6xl" | "7xl";
}

export function SectionShell({
  id,
  children,
  asset,
  className = "",
  contentClassName = "",
  maxWidth = "7xl",
}: SectionShellProps) {
  const maxWidthClass = maxWidth === "6xl" ? "max-w-6xl" : "max-w-7xl";

  return (
    <section id={id} className={`section-padding ${className}`}>
      {asset}
      <div className={`section-content mx-auto ${maxWidthClass} ${contentClassName}`}>
        {children}
      </div>
    </section>
  );
}
