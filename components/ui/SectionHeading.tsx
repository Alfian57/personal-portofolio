import { SECTION_CHAPTERS, type SectionKey } from "@/constants/lore-content";

interface SectionHeadingProps {
  section: SectionKey;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ section, description, align = "left" }: SectionHeadingProps) {
  const meta = SECTION_CHAPTERS[section];
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`mb-8 flex flex-col gap-3 md:mb-10 ${alignment}`}>
      <p className="section-kicker">{`${meta.chapter} / ${meta.english}`}</p>
      <div className="space-y-1">
        <h2 className="section-title">{meta.lore}</h2>
        <p className="section-english">{meta.english}</p>
      </div>
      <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
        {description ?? meta.description}
      </p>
    </div>
  );
}
