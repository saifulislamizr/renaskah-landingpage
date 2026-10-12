import type { AssurancesContent } from "@/content/schema";
import { CheckIcon } from "@/components/ui/icons";

/**
 * Answers "is it safe to pay a 50% deposit to someone I found online?"
 * right where that question comes up: under the pricing and the form.
 */
export default function Assurances({ content, className = "" }: { content: AssurancesContent; className?: string }) {
  return (
    <div className={`rounded-2xl bg-surface p-5 neu-raised ${className}`}>
      <p className="text-sm font-semibold text-ink-900">{content.title}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {content.items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-ink-700">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
