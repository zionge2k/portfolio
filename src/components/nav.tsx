import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  return (
    <header className="border-b border-ctp-surface-0">
      <nav
        aria-label="메인 내비게이션"
        className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4"
      >
        <Link href="/" className="rounded text-lg font-semibold text-ctp-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-mauve">
          이성
        </Link>
        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="rounded text-sm text-ctp-subtext-1 transition-colors hover:text-ctp-mauve focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ctp-mauve"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
