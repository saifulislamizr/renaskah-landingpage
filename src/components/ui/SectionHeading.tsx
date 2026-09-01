import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: string | ReactNode;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${light ? "text-copper-300" : "text-copper-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-ink-950"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-ink-300" : "text-ink-500"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
