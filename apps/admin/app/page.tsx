import { getDashboard } from "@/lib/dashboard";
import type { Gender } from "@/lib/types";
import { GenderSwitch } from "./_components/gender-switch";
import { InterestBreakdown } from "./_components/interest-breakdown";
import { Panel } from "./_components/panel";
import { Pipeline } from "./_components/pipeline";
import { StatCard } from "./_components/stat-card";

export default async function DashboardPage({ searchParams }: PageProps<"/">) {
  const { gender: genderParam } = await searchParams;
  const gender: Gender = genderParam === "akhawat" ? "akhawat" : "ikhwah";
  const data = getDashboard(gender);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            PSPB 2026/27 · sample data until the database is connected
          </p>
        </div>
        <GenderSwitch current={gender} />
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="New members" value={data.total} note="All candidates this intake" />
        <StatCard label="Waiting for a PD" value={data.unassigned} note="No PD assigned yet" />
        <StatCard label="In usrah" value={data.inUsrah} note="Usrah 1 to 10" />
        <StatCard label="Dropped" value={data.dropped} />
      </div>

      <Panel
        title="Interest"
        description="What each new member said on the feedback and registration forms. The four groups always add up to the total."
      >
        <InterestBreakdown interest={data.interest} total={data.total} />
      </Panel>

      <Panel title="Follow-up filters" description="Candidates who still need follow-up, by the six filters in the proposal.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.filters.map((f) => (
            <div
              key={f.key}
              className="rounded-md border border-zinc-200 px-4 py-3 dark:border-zinc-800"
            >
              <p className="text-2xl font-semibold tabular-nums">{f.count}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{f.label}</p>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Pipeline" description="Where every candidate is now, from first contact to Tarshih.">
          <Pipeline steps={data.pipeline} />
        </Panel>

        <Panel title="PD workload" description="Anak buah per PD, most first.">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-zinc-500 dark:text-zinc-400">
                <th className="pb-2 font-normal">PD</th>
                <th className="pb-2 text-right font-normal">Anak buah</th>
                <th className="pb-2 text-right font-normal">In usrah</th>
              </tr>
            </thead>
            <tbody>
              {data.pdWorkload.map((pd) => (
                <tr key={pd.id} className="border-t border-zinc-100 dark:border-zinc-800">
                  <td className="py-2">{pd.name}</td>
                  <td className="py-2 text-right tabular-nums">{pd.anakBuah}</td>
                  <td className="py-2 text-right tabular-nums">{pd.inUsrah}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
