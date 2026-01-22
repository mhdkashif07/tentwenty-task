"use client";

import React, { useState, useEffect } from "react";
import { Timesheet } from "@/types/Timesheet";

export default function TimesheetModal({
  open,
  onClose,
  onSave,
  initial,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (payload: Omit<Timesheet, "id">, id?: string) => Promise<any>;
  initial?: Timesheet | null;
}) {
  const [weekNumber, setWeekNumber] = useState(initial?.weekNumber || 1);
  const [date, setDate] = useState(
    initial?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10),
  );
  const [hours, setHours] = useState<number>(initial?.hours || 8);
  const [status, setStatus] = useState<Timesheet["status"]>(
    initial?.status || "pending",
  );

  useEffect(() => {
    if (initial) {
      setWeekNumber(initial.weekNumber);
      setDate(initial.date.slice(0, 10));
      setHours(initial.hours);
      setStatus(initial.status);
    }
  }, [initial]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave({
      weekNumber,
      date: new Date(date).toISOString(),
      status,
      hours,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h3 className="text-lg font-medium mb-4">
          {initial ? "Edit Timesheet" : "Add Timesheet"}
        </h3>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">Week #</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 mb-2"
            value={weekNumber}
            onChange={(e) => setWeekNumber(Number(e.target.value))}
          />

          <label className="block text-sm">Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1 mb-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="block text-sm">Hours</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1 mb-2"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />

          <label className="block text-sm">Status</label>
          <select
            className="w-full border rounded px-2 py-1 mb-4"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="pending">pending</option>
            <option value="submitted">submitted</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1">
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-primary text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
