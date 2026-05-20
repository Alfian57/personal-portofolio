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
    <div className={`section-heading ${alignment}`}>
      <div className="section-heading-rule" aria-hidden="true" />
      <p className="section-kicker">{`${meta.index} / ${meta.eyebrow}`}</p>
      <h2 className="section-title">{meta.title}</h2>
      <p className="section-description">{description ?? meta.description}</p>
    </div>
  );
}
