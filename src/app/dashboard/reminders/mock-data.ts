export interface testReminder {
  id: string;
  company: string;
  role: string;
  type: string;
  dueDate: string;
}

export const overdueReminders: testReminder[] = [
  {
    id: "1",
    company: "Stripe",
    role: "Backend SWE",
    type: "Interview Prep",
    dueDate: "Mar 10",
  },
  {
    id: "2",
    company: "Meta",
    role: "Full Stack SWE",
    type: "OA Practice",
    dueDate: "Mar 12",
  },
];

export const todayReminders: testReminder[] = [
  {
    id: "3",
    company: "Google",
    role: "SWE Intern",
    type: "Follow-up",
    dueDate: "Mar 16",
  },
];

export const weekReminders: testReminder[] = [
  {
    id: "4",
    company: "Airbnb",
    role: "Frontend SWE",
    type: "Application Deadline",
    dueDate: "Mar 20",
  },
  {
    id: "5",
    company: "Amazon",
    role: "SDE I",
    type: "Assessment",
    dueDate: "Mar 21",
  },
  {
    id: "6",
    company: "Netflix",
    role: "UI Engineer",
    type: "Portfolio Update",
    dueDate: "Mar 22",
  },
];
