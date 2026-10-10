import Link from "next/link";

// Only the dashboard exists so far; the other pages are listed so the team can
// see where each module will live.
const links = [
  { href: "/", label: "Dashboard", ready: true },
  { href: "#", label: "Candidates", ready: false },
  { href: "#", label: "Programs and attendance", ready: false },
  { href: "#", label: "PD assignment", ready: false },
  { href: "#", label: "Import data", ready: false },
];

export function Sidebar() {
  return (
    <aside className="border-b border-zinc-200 bg-white md:w-60 md:shrink-0 md:border-b-0 md:border-r dark:border-zinc-800 dark:bg-zinc-950">
      <div className="px-4 py-4 md:px-5 md:py-6">
        <p className="text-xs font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
          PSM PEMBINA IIUM
        </p>
        <p className="text-lg font-semibold">Admin</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-2 pb-3 md:flex-col md:px-3">
        {links.map((link) =>
          link.ready ? (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
            >
              {link.label}
            </Link>
          ) : (
            <span
              key={link.label}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm text-zinc-400 dark:text-zinc-600"
              title="Coming soon"
            >
              {link.label}
            </span>
          ),
        )}
      </nav>
    </aside>
  );
}
