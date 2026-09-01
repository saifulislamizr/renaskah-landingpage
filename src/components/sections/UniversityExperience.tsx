import type { SiteContent } from "@/content/schema";
import HighlightedText from "@/components/ui/HighlightedText";

export default function UniversityExperience({ content }: { content: SiteContent }) {
  const { universityExperience: u } = content;

  return (
    <section className="border-b border-border bg-ink-950 py-16 text-white sm:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            <HighlightedText line={u.title} />
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-300">{u.intro}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {u.universities.map((uni) => (
            <span
              key={uni}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium tracking-wide text-white"
            >
              {uni}
            </span>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ink-400">{u.disclaimer}</p>
      </div>
    </section>
  );
}
