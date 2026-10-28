"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

type State = "idle" | "copied" | "error";

/** Muestra un texto (URL, comando) con un botón para copiarlo y confirmación visual. */
export function CopyField({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<State>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setState("copied");
    } catch {
      setState("error");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className="group flex w-full items-stretch overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-colors focus-within:border-violet-400 dark:border-zinc-800 dark:bg-zinc-950">
      <code
        className="flex min-w-0 flex-1 items-center break-all px-4 py-3 font-mono text-sm text-zinc-800 select-all dark:text-zinc-200"
        aria-label={label}
      >
        {value}
      </code>
      <button
        type="button"
        onClick={copy}
        className={`flex shrink-0 items-center gap-1.5 border-l px-4 text-sm font-medium transition-all active:scale-95 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-500 ${
          state === "copied"
            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
            : state === "error"
              ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
              : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-violet-50 hover:text-violet-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-violet-950 dark:hover:text-violet-300"
        }`}
      >
        {state === "copied" ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
        <span>{state === "copied" ? "¡Copiado!" : state === "error" ? "Cópialo a mano" : "Copiar"}</span>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Copiado al portapapeles" : state === "error" ? "No se pudo copiar" : ""}
      </span>
    </div>
  );
}
