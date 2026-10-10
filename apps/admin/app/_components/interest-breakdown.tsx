type Interest = { usrahOnly: number; pembinaOnly: number; both: number; neither: number };

const segments: { key: keyof Interest; label: string; color: string }[] = [
  { key: "usrahOnly", label: "Usrah only", color: "bg-emerald-500" },
  { key: "both", label: "Both", color: "bg-teal-700" },
  { key: "pembinaOnly", label: "Pembina only", color: "bg-sky-500" },
  { key: "neither", label: "Neither", color: "bg-zinc-300 dark:bg-zinc-700" },
];

export function InterestBreakdown({ interest, total }: { interest: Interest; total: number }) {
  const percent = (n: number) => (total === 0 ? 0 : Math.round((n / total) * 100));
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full">
        {segments.map((s) => (
          <div key={s.key} className={s.color} style={{ width: `${percent(interest[s.key])}%` }} />
        ))}
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {segments.map((s) => (
          <div key={s.key}>
            <dt className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
              {s.label}
            </dt>
            <dd className="mt-1 text-2xl font-semibold tabular-nums">
              {interest[s.key]}
              <span className="ml-1 text-sm font-normal text-zinc-500 dark:text-zinc-400">
                {percent(interest[s.key])}%
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
