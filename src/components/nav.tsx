"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "~/home" },
  { href: "/about", label: "~/about" },
  { href: "/blog", label: "~/blog" },
];

export default function Nav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="border-b border-t-border">
      <nav
        aria-label="메인 내비게이션"
        className="mx-auto flex max-w-3xl items-center px-6"
      >
        <Link
          href="/"
          className="mr-6 rounded py-3 text-sm font-semibold text-t-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
        >
          <span className="text-t-subtle">~/</span>zion
        </Link>
        <div className="flex">
          {tabs.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`border-b-2 px-4 py-3 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-t-accent ${
                isActive(href)
                  ? "border-t-accent text-t-fg"
                  : "border-transparent text-t-muted hover:text-t-fg"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
