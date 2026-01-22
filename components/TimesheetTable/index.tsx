"use client";

import React from "react";
import { Timesheet } from "@/types/Timesheet";

function StatusBadge({ status }: { status: Timesheet["status"] }) {
  const base =
    "inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold";

  if (status === "approved" || status === "submitted") {
    return (
      <span className={`${base} bg-teal-100 text-teal-800`}>COMPLETED</span>
    );
  }
  if (status === "pending") {
    return (
      <span className={`${base} bg-yellow-100 text-yellow-800`}>
        INCOMPLETE
      </span>
    );
  }
  if (status === "rejected") {
    return <span className={`${base} bg-pink-100 text-pink-800`}>MISSING</span>;
  }
  return (
    <span className={`${base} bg-gray-100 text-gray-800`}>
      {String(status).toUpperCase()}
    </span>
  );
}

export default function TimesheetTable({
  items,
  onEdit,
  onDelete,
  onView,
}: {
  items: Timesheet[];
  onEdit: (t: Timesheet) => void;
  onDelete: (id: string) => void;
  onView?: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="border-b bg-[#F9FAFB] border-[#E5E7EB]">
          <tr>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              WEEK # ↓
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              DATE ↓
            </th>
            <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              STATUS ↓
            </th>
            <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {items.map((t, idx) => (
            <tr key={t.id} className="border-b border-[#E5E7EB]">
              <td className="px-4 py-4">{t.weekNumber}</td>
              <td className="px-4 py-4 text-gray-600">
                {new Date(t.date).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={t.status} />
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-4">
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => onView?.(t.id)}
                  >
                    View
                  </button>
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => onEdit(t)}
                  >
                    Update
                  </button>
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => onDelete(t.id)}
                  >
                    Create
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
