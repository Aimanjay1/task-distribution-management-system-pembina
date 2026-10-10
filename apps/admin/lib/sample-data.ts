import type { Candidate, Gender, PdUser, Stage } from "./types";

// Sample data so the dashboard can be built before the database exists.
// It is generated from a fixed seed, so every reload shows the same numbers.

function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const random = seededRandom(2026);
const pick = <T,>(items: T[]) => items[Math.floor(random() * items.length)];
const chance = (probability: number) => random() < probability;

const firstNames: Record<Gender, string[]> = {
  ikhwah: ["Ahmad", "Muhammad", "Amir", "Hakim", "Irfan", "Danial", "Harith", "Syafiq", "Aiman", "Ibrahim"],
  akhawat: ["Nur", "Aisyah", "Sofea", "Hana", "Iman", "Balqis", "Maryam", "Huda", "Alya", "Syahirah"],
};
const fatherNames = ["Abdullah", "Ismail", "Hassan", "Yusof", "Rahman", "Zakaria", "Kamal", "Salleh"];
const kulliyyahs = ["KICT", "KOE", "KENMS", "AHAS KIRKHS", "KOS", "KAED", "KOED", "AIKOL"];

const stageWeights: [Stage, number][] = [
  ["new", 30],
  ["assigned", 18],
  ["met", 14],
  ["close_deal", 10],
  ["muhib", 8],
  ["in_usrah", 10],
  ["muayyid_review", 3],
  ["tarshih", 2],
  ["dropped", 5],
];

function pickStage(): Stage {
  const total = stageWeights.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = random() * total;
  for (const [stage, weight] of stageWeights) {
    roll -= weight;
    if (roll < 0) return stage;
  }
  return "new";
}

export const pdUsers: PdUser[] = [
  { id: "pd-1", name: "Ustaz Hafiz", gender: "ikhwah" },
  { id: "pd-2", name: "Akh Zulkifli", gender: "ikhwah" },
  { id: "pd-3", name: "Akh Faris", gender: "ikhwah" },
  { id: "pd-4", name: "Akh Naim", gender: "ikhwah" },
  { id: "pd-5", name: "Ukht Khadijah", gender: "akhawat" },
  { id: "pd-6", name: "Ukht Farhana", gender: "akhawat" },
  { id: "pd-7", name: "Ukht Zahra", gender: "akhawat" },
  { id: "pd-8", name: "Ukht Amirah", gender: "akhawat" },
];

function makeCandidates(gender: Gender, count: number, offset: number): Candidate[] {
  const pds = pdUsers.filter((pd) => pd.gender === gender);
  return Array.from({ length: count }, (_, index) => {
    const stage = pickStage();
    const hasPd = stage !== "new" && stage !== "dropped";
    const binti = gender === "ikhwah" ? "bin" : "binti";
    return {
      id: `c-${offset + index}`,
      matricNo: String(2410000 + offset + index),
      fullName: `${pick(firstNames[gender])} ${binti} ${pick(fatherNames)}`,
      gender,
      kulliyyah: pick(kulliyyahs),
      interestUsrah: chance(0.55),
      interestPembina: chance(0.45),
      interestAjk: chance(0.3),
      isPembinaMember: chance(0.25),
      stage,
      programsAttended: Math.floor(random() * 5),
      pdUserId: hasPd ? pick(pds).id : null,
    };
  });
}

export const candidates: Candidate[] = [
  ...makeCandidates("ikhwah", 142, 0),
  ...makeCandidates("akhawat", 187, 1000),
];
