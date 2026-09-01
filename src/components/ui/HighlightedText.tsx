import type { HighlightedLine } from "@/content/schema";
import Highlight from "./Highlight";

/**
 * Renders a HighlightedLine (lead / keyword / tail) as inline content,
 * wrap it in whatever heading tag the section needs:
 *   <h1><HighlightedText line={content.hero.headline} /></h1>
 *
 * No spacing is inserted automatically between the three parts, content
 * authors include whatever leading/trailing space or punctuation each
 * part needs (e.g. lead: "Dah betulkan ", tail: ", bahagian lain berubah."),
 * so punctuation attaches naturally instead of always having a space
 * before it.
 */
export default function HighlightedText({
  line,
  color,
}: {
  line: HighlightedLine;
  color?: "copper" | "teal";
}) {
  return (
    <>
      {line.lead}
      <Highlight color={line.keywordColor ?? color ?? "copper"}>{line.keyword}</Highlight>
      {line.tail}
    </>
  );
}
