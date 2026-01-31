"use client";

import { useState } from "react";
import { VimBuffer, Line } from "@/components/vim-buffer";

export default function VimToggle({
  filename,
  items,
}: {
  filename: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-t-accent"
      >
        <span className="text-t-blue">~</span>
        <span className="text-t-green">{" $ "}</span>
        <span className="text-t-fg">
          {open ? ":q" : `vim ${filename}`}
        </span>
      </button>
      {open && (
        <div className="mt-2">
          <VimBuffer filename={filename}>
            {items.map((item, i) => (
              <Line key={item} n={i + 1}>
                <span className="text-t-green" aria-hidden="true">
                  &gt;{" "}
                </span>
                <span className="text-t-fg">{item}</span>
              </Line>
            ))}
          </VimBuffer>
        </div>
      )}
    </div>
  );
}
