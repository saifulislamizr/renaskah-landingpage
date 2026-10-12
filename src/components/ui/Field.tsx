import type { ReactNode } from "react";

export const fieldInputClass =
  "w-full min-h-12 rounded-xl border border-transparent bg-surface px-4 neu-inset-sm text-base text-ink-900 placeholder:text-ink-400 transition-colors focus:border-copper-500 focus:outline-none focus:ring-2 focus:ring-copper-500/20 aria-[invalid=true]:border-red-400";

export default function Field({
  id,
  label,
  helper,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  helper?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-800">
        {label}
        {required && <span className="ml-0.5 text-copper-500">*</span>}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-1.5 text-xs text-ink-400">{helper}</p>
      ) : null}
    </div>
  );
}
