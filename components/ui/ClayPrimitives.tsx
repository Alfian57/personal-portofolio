import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ClaySurfaceProps {
  children: ReactNode;
  className?: string;
  variant?: "card" | "strong" | "inset";
}

interface ClayMetricProps {
  label: string;
  value: string;
  className?: string;
}

interface ClayListItemProps {
  icon?: LucideIcon;
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: string;
  className?: string;
}

export function ClaySurface({ children, className = "", variant = "card" }: ClaySurfaceProps) {
  const variantClass =
    variant === "strong"
      ? "clay-card clay-card-strong"
      : variant === "inset"
        ? "clay-inset"
        : "clay-card";

  return <div className={`${variantClass} ${className}`}>{children}</div>;
}

export function ClayMetric({ label, value, className = "" }: ClayMetricProps) {
  return (
    <ClaySurface className={`p-4 ${className}`}>
      <p className="text-xs font-extrabold tracking-[0.14em] text-[var(--accent)] uppercase dark:text-[var(--accent)]">
        {label}
      </p>
      <p className="display-font mt-2 text-3xl font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
        {value}
      </p>
    </ClaySurface>
  );
}

export function ClayListItem({
  icon: Icon,
  eyebrow,
  title,
  description,
  meta,
  className = "",
}: ClayListItemProps) {
  return (
    <div className={`clay-list-item ${className}`}>
      {Icon && (
        <div className="clay-icon h-10 w-10 shrink-0 rounded-[1.15rem]">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <p className="text-[0.68rem] font-extrabold tracking-[0.14em] text-[var(--accent)] uppercase dark:text-[var(--accent)]">
            {eyebrow}
          </p>
        )}
        <p className="font-extrabold text-[var(--foreground)] dark:text-[var(--foreground)]">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-sm leading-5 text-[var(--muted)] dark:text-[var(--muted)]">
            {description}
          </p>
        )}
      </div>
      {meta && (
        <span className="shrink-0 text-xs font-extrabold text-[var(--accent)] dark:text-[var(--accent)]">
          {meta}
        </span>
      )}
    </div>
  );
}
