import { SECTION_CONTENT, type SectionKey } from "@/constants/section-content";

interface SectionHeadingProps {
  section: SectionKey;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ section, description, align = "left" }: SectionHeadingProps) {
  const meta = SECTION_CONTENT[section];
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`mb-5 flex flex-col gap-2 md:mb-6 ${alignment}`}>
      <p className="section-kicker">{`${meta.index} / ${meta.eyebrow}`}</p>
      <div className="space-y-1">
        <h2 className="section-title">{meta.title}</h2>
        <p className="section-english">{meta.eyebrow}</p>
      </div>
      <div className="flex gap-2" aria-hidden="true">
        <span className="heading-swatch bg-[var(--accent)]" />
        <span className="heading-swatch bg-[var(--accent-mint)]" />
        <span className="heading-swatch bg-[var(--accent-pink)]" />
      </div>
      <p className="max-w-2xl text-sm leading-6 text-[var(--muted)] dark:text-[var(--muted)]">
        {description ?? meta.description}
      </p>
    </div>
  );
}
