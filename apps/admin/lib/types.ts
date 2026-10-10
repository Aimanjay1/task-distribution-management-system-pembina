// Types that mirror the agreed schema (see the "PSPB Shared Database Schema" doc).
// Once the database is set up, these will come from the shared db package instead.

export type Gender = "ikhwah" | "akhawat";

export type Stage =
  | "new"
  | "assigned"
  | "met"
  | "close_deal"
  | "muhib"
  | "in_usrah"
  | "muayyid_review"
  | "tarshih"
  | "dropped";

export type Candidate = {
  id: string;
  matricNo: string;
  fullName: string;
  gender: Gender;
  kulliyyah: string;
  interestUsrah: boolean;
  interestPembina: boolean;
  interestAjk: boolean;
  isPembinaMember: boolean;
  stage: Stage;
  // In the database this is a count of event_attendance rows.
  programsAttended: number;
  // In the database this comes from the active pd_assignments row.
  pdUserId: string | null;
};

export type PdUser = {
  id: string;
  name: string;
  gender: Gender;
};
