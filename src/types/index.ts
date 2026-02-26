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
