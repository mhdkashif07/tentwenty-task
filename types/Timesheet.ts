export type TimesheetStatus = "pending" | "submitted" | "approved" | "rejected";

export interface Timesheet {
  id: string;
  weekNumber: number;
  date: string; // ISO date string
  status: TimesheetStatus;
  hours: number;
  notes?: string;
}
