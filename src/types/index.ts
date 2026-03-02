export type Application = {
  id: string;
  userId: string;
  company: string;
  position: string;
  status: string;
  notes: string | null;
  salary: string | null;
  location: string | null;
  jobType: string | null;
  appliedAt: Date;
  followUpAt: Date | null;
  createdAt: Date;
};
export enum ApplicationStatus {
  APPLIED,
  INTERVIEW,
  OFFER,
  REJECTED,
  GHOSTED,
}

export enum JobType {
  INTERNSHIP,
  FULL_TIME,
  PART_TIME,
}
export const statusStyles: Record<string, string> = {
  applied: "text-yellow-300 bg-yellow-950",
  rejected: "text-red-300 bg-red-950",
  ghosted: "text-gray-300 bg-gray-950",
  interview: "text-cyan-300 bg-cyan-950",
  offer: "text-green-300 bg-green-950",
};