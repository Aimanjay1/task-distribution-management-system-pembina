import { candidates, pdUsers } from "./sample-data";
import type { Candidate, Gender, Stage } from "./types";

// The dashboard's numbers. Each rule here matches the schema doc, so when the
// database arrives only the source of `candidates` changes, not the rules.

export const stages: { key: Stage; label: string }[] = [
  { key: "new", label: "New" },
  { key: "assigned", label: "PD assigned" },
  { key: "met", label: "Met PD (liqo)" },
  { key: "close_deal", label: "Close deal" },
  { key: "muhib", label: "Muhib" },
  { key: "in_usrah", label: "In usrah" },
  { key: "muayyid_review", label: "Penilaian Muayyid" },
  { key: "tarshih", label: "Tarshih" },
];

export const followUpFilters: {
  key: string;
  label: string;
  rule: (c: Candidate) => boolean;
}[] = [
  { key: "minat-usrah", label: "Minat usrah", rule: (c) => c.interestUsrah },
  { key: "minat-pembina", label: "Minat Pembina", rule: (c) => c.interestPembina },
  {
    key: "ahli-minat-usrah",
    label: "Sudah join Pembina, minat usrah",
    rule: (c) => c.isPembinaMember && c.interestUsrah,
  },
  {
    key: "ahli-minat-ajk",
    label: "Sudah join Pembina, minat AJK",
    rule: (c) => c.isPembinaMember && c.interestAjk,
  },
  {
    key: "minat-ajk-sahaja",
    label: "Tidak minat usrah dan Pembina, minat AJK",
    rule: (c) => !c.interestUsrah && !c.interestPembina && c.interestAjk,
  },
  { key: "hadir-3-program", label: "3 kali hadir program", rule: (c) => c.programsAttended >= 3 },
];

export function getDashboard(gender: Gender) {
  const mine = candidates.filter((c) => c.gender === gender);
  const active = mine.filter((c) => c.stage !== "dropped");

  const interest = {
    usrahOnly: mine.filter((c) => c.interestUsrah && !c.interestPembina).length,
    pembinaOnly: mine.filter((c) => c.interestPembina && !c.interestUsrah).length,
    both: mine.filter((c) => c.interestUsrah && c.interestPembina).length,
    neither: mine.filter((c) => !c.interestUsrah && !c.interestPembina).length,
  };

  const filters = followUpFilters.map((f) => ({
    key: f.key,
    label: f.label,
    count: active.filter(f.rule).length,
  }));

  const pipeline = stages.map((s) => ({
    ...s,
    count: mine.filter((c) => c.stage === s.key).length,
  }));

  const pdWorkload = pdUsers
    .filter((pd) => pd.gender === gender)
    .map((pd) => {
      const anakBuah = active.filter((c) => c.pdUserId === pd.id);
      return {
        id: pd.id,
        name: pd.name,
        anakBuah: anakBuah.length,
        inUsrah: anakBuah.filter((c) => c.stage === "in_usrah").length,
      };
    })
    .sort((a, b) => b.anakBuah - a.anakBuah);

  return {
    total: mine.length,
    unassigned: active.filter((c) => c.pdUserId === null).length,
    inUsrah: mine.filter((c) => c.stage === "in_usrah").length,
    dropped: mine.filter((c) => c.stage === "dropped").length,
    interest,
    filters,
    pipeline,
    pdWorkload,
  };
}
