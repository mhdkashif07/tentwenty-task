import { Timesheet } from "@/types/Timesheet";
import { v4 as uuidv4 } from "uuid";

// In-memory store for assessment purposes
let TIMESHEETS: Timesheet[] = [
  {
    id: uuidv4(),
    weekNumber: 1,
    date: new Date().toISOString(),
    status: "submitted",
    hours: 40,
    notes: "Initial entry",
  },
];

export const TimesheetService = {
  getAll(): Timesheet[] {
    return TIMESHEETS;
  },

  getById(id: string): Timesheet | undefined {
    return TIMESHEETS.find((t) => t.id === id);
  },

  create(payload: Omit<Timesheet, "id">): Timesheet {
    const newItem: Timesheet = { id: uuidv4(), ...payload };
    TIMESHEETS = [newItem, ...TIMESHEETS];
    return newItem;
  },

  update(id: string, changes: Partial<Timesheet>): Timesheet | null {
    const idx = TIMESHEETS.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    const updated = { ...TIMESHEETS[idx], ...changes };
    TIMESHEETS[idx] = updated;
    return updated;
  },

  remove(id: string): boolean {
    const before = TIMESHEETS.length;
    TIMESHEETS = TIMESHEETS.filter((t) => t.id !== id);
    return TIMESHEETS.length < before;
  },
};
