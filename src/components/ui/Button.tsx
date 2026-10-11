"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { handleHashClick } from "@/lib/scrollToHash";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost" | "outlineLight";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper-500 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-copper-500 text-white hover:bg-copper-600 active:bg-copper-700",
  secondary: "bg-transparent text-ink-900 border border-ink-900/20 hover:border-ink-900/40 hover:bg-ink-900/[0.03]",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  ghost: "bg-transparent text-ink-700 hover:text-ink-900",
  outlineLight: "bg-transparent text-white border border-white/25 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm min-h-11",
  lg: "px-7 py-3.5 text-base min-h-13",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export default function Button(props: ButtonProps) {
  // Take the styling props out first, so spreading the remaining DOM
  // attributes can never overwrite the computed className.
  const { variant = "primary", size = "md", icon, className = "", children, ...domProps } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in domProps && domProps.href) {
    const { href, external, onClick, ...rest } = domProps as Omit<ButtonAsLink, keyof CommonProps>;

    if (external || href.startsWith("http") || href.startsWith("https://wa.me")) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...rest} className={classes} onClick={onClick}>
          {icon}
          {children}
        </a>
      );
    }

    if (href.startsWith("#")) {
      return (
        <a
          href={href}
          {...rest}
          className={classes}
          onClick={(e) => {
            onClick?.(e);
            handleHashClick(e, href);
          }}
        >
          {icon}
          {children}
        </a>
      );
    }

    return (
      <Link href={href} {...rest} className={classes} onClick={onClick}>
        {icon}
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = domProps as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type={type} {...rest} className={classes}>
      {icon}
      {children}
    </button>
  );
}
