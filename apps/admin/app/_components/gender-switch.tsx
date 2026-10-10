import Link from "next/link";
import type { Gender } from "@/lib/types";

// For now anyone can switch. Once login exists, a committee member will only
// see their own gender and this switch goes away for them.
export function GenderSwitch({ current }: { current: Gender }) {
  const options: { value: Gender; label: string }[] = [
    { value: "ikhwah", label: "Ikhwah" },
    { value: "akhawat", label: "Akhawat" },
  ];
  return (
    <div className="inline-flex rounded-md border border-zinc-200 bg-white p-0.5 text-sm dark:border-zinc-800 dark:bg-zinc-950">
      {options.map((o) => (
        <Link
          key={o.value}
          href={`/?gender=${o.value}`}
          className={
            o.value === current
              ? "rounded px-3 py-1.5 font-medium bg-emerald-600 text-white"
              : "rounded px-3 py-1.5 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          }
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
