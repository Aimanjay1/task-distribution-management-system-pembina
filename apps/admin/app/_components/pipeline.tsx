type Step = { key: string; label: string; count: number };

export function Pipeline({ steps }: { steps: Step[] }) {
  const max = Math.max(1, ...steps.map((s) => s.count));
  return (
    <ol className="space-y-2">
      {steps.map((s) => (
        <li key={s.key} className="grid grid-cols-[9rem_1fr_2.5rem] items-center gap-3 text-sm">
          <span className="text-zinc-600 dark:text-zinc-300">{s.label}</span>
          <span className="h-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
            <span
              className="block h-2 rounded-full bg-emerald-600"
              style={{ width: `${(s.count / max) * 100}%` }}
            />
          </span>
          <span className="text-right font-medium tabular-nums">{s.count}</span>
        </li>
      ))}
    </ol>
  );
}
