"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const SHELL_HISTORY = [
  { command: "cd ~", path: "/" },
  { command: "cd ~/about", path: "/about" },
  { command: "cd ~/blog", path: "/blog" },
];

function pathnameToShellPath(pathname: string) {
  if (pathname === "/") return "~/portfolio";
  return `~/portfolio${pathname}`;
}

export default function Footer() {
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handlerRef = useRef<(e: KeyboardEvent) => void>(() => {});

  handlerRef.current = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement)?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
      if (e.target !== inputRef.current) return;
    }

    switch (e.key) {
      case "ArrowUp": {
        e.preventDefault();
        setOpen(true);
        setHistoryIndex((prev) =>
          prev >= SHELL_HISTORY.length - 1 ? 0 : prev + 1
        );
        break;
      }
      case "ArrowDown": {
        e.preventDefault();
        setOpen(true);
        setHistoryIndex((prev) =>
          prev <= -1 ? SHELL_HISTORY.length - 1 : prev - 1
        );
        break;
      }
      case "Enter": {
        if (historyIndex < 0) return;
        e.preventDefault();
        const { path } = SHELL_HISTORY[historyIndex];
        setHistoryIndex(-1);
        setOpen(false);
        router.push(path);
        break;
      }
      case "Escape": {
        if (!open) return;
        e.preventDefault();
        setHistoryIndex(-1);
        setOpen(false);
        break;
      }
    }
  };

  useEffect(() => {
    const listener = (e: KeyboardEvent) => handlerRef.current(e);
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        setHistoryIndex(-1);
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const active = historyIndex >= 0 ? SHELL_HISTORY[historyIndex] : null;
  const shellPath = pathnameToShellPath(pathname);
  const lastSlash = shellPath.lastIndexOf("/");
  const pathPrefix = shellPath.slice(0, lastSlash + 1);
  const pathTail = shellPath.slice(lastSlash + 1);

  return (
    <footer className="sticky bottom-0 z-10 bg-t-gutter">
      <div className="mx-auto w-full max-w-3xl px-6 py-3">
        <p className="mb-2 text-xs">
          <span className="text-t-subtle">{pathPrefix}</span>
          <span className="text-t-fg">{pathTail}</span>
          <span className="text-t-muted">
            {" · "}이성 &copy; 2026
          </span>
        </p>
        <div ref={shellRef} className="relative">
          {open && (
            <ul
              role="listbox"
              className="absolute bottom-full left-0 mb-1 w-full rounded-md border border-t-border bg-t-bg py-1 text-sm shadow-lg"
            >
              {[...SHELL_HISTORY].reverse().map((item, ri) => {
                const i = SHELL_HISTORY.length - 1 - ri;
                return (
                <li
                  key={item.path}
                  role="option"
                  aria-selected={i === historyIndex}
                  className={`cursor-pointer px-3 py-1 ${
                    i === historyIndex
                      ? "bg-t-accent/10 text-t-accent"
                      : "text-t-muted"
                  }`}
                  onMouseEnter={() => setHistoryIndex(i)}
                  onClick={() => {
                    setHistoryIndex(-1);
                    setOpen(false);
                    router.push(item.path);
                  }}
                >
                  <span className="text-t-subtle">$ </span>
                  {item.command}
                </li>
                );
              })}
            </ul>
          )}
          <div
            className="cursor-text rounded-md border border-t-border bg-t-bg px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-t-accent"
            onClick={() => {
              inputRef.current?.focus();
              setOpen((prev) => !prev);
              if (!open) setHistoryIndex(0);
            }}
          >
            <input
              ref={inputRef}
              readOnly
              tabIndex={-1}
              className="absolute inset-0 opacity-0"
              aria-label="Shell history navigation"
            />
            <span className="text-t-blue">~</span>
            <span className="text-t-green">{" $ "}</span>
            {active ? (
              <span className="text-t-fg">{active.command}</span>
            ) : (
              <span
                className="inline-block w-2 animate-pulse bg-t-fg motion-reduce:animate-none"
                aria-hidden="true"
              >
                &nbsp;
              </span>
            )}
            {!open && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-t-subtle">
                <kbd className="rounded border border-t-border px-1 py-0.5">
                  &uarr;
                </kbd>
                <kbd className="ml-0.5 rounded border border-t-border px-1 py-0.5">
                  &darr;
                </kbd>
                <span className="ml-1.5">navigate</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
