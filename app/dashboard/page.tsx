"use client";

import React, { useState, useMemo } from "react";
import { useTimesheets } from "@/hooks/useTimesheets";
import TimesheetTable from "@/components/TimesheetTable";
import { Timesheet } from "@/types/Timesheet";

export default function DashboardPage() {
  const { items, loading, create, update, remove } = useTimesheets();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Timesheet | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilter, setStatusFilter] = useState("all");
  const [formData, setFormData] = useState({
    weekNumber: 1,
    date: new Date().toISOString(),
    hours: 8,
    status: "pending" as Timesheet["status"],
  });

  const filtered = useMemo(() => {
    return statusFilter === "all"
      ? items
      : items.filter((i) => i.status === statusFilter);
  }, [items, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function handleSave() {
    if (editing) {
      await update(editing.id, formData);
      setEditing(null);
    } else {
      await create(formData);
    }
    setOpen(false);
  }

  function handleOpenModal(timesheet?: Timesheet) {
    if (timesheet) {
      setEditing(timesheet);
      setFormData({
        weekNumber: timesheet.weekNumber,
        date: timesheet.date,
        hours: timesheet.hours,
        status: timesheet.status,
      });
    } else {
      setEditing(null);
      setFormData({
        weekNumber: 1,
        date: new Date().toISOString(),
        hours: 8,
        status: "pending",
      });
    }
    setOpen(true);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Your Timesheets</h3>
          <div>
            <button
              className="text-sm text-gray-600"
              onClick={() => handleOpenModal()}
            >
              Create
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <select className="border border-border rounded-md px-3 py-2 text-sm text-gray-700 bg-white">
            <option>Date Range</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border border-border rounded-md px-3 py-2 text-sm text-gray-700 bg-white"
          >
            <option value="all">Status</option>
            <option value="pending">Pending</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <TimesheetTable
              items={paged}
              onEdit={(t) => handleOpenModal(t)}
              onDelete={(id) => remove(id)}
              onView={() => {
                /* view handler placeholder */
              }}
            />

            <div className="flex items-center justify-between mt-4">
              <div>
                <label className="text-sm text-gray-600">Show </label>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-2 py-1 border rounded"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages })
                  .slice(0, 8)
                  .map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPage(idx + 1)}
                      className={`px-2 py-1 border rounded ${page === idx + 1 ? "bg-gray-200" : ""}`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-2 py-1 border rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {editing ? "Edit Timesheet" : "Add Timesheet"}
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setEditing(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Week #</label>
                <input
                  type="number"
                  className="w-full border rounded-md px-3 py-2"
                  value={formData.weekNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      weekNumber: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2"
                  value={formData.date.slice(0, 10)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      date: new Date(e.target.value).toISOString(),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hours</label>
                <input
                  type="number"
                  className="w-full border rounded-md px-3 py-2"
                  value={formData.hours}
                  onChange={(e) =>
                    setFormData({ ...formData, hours: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Timesheet["status"],
                    })
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="submitted">Submitted</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  {editing ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setEditing(null);
                  }}
                  className="px-6 py-2 text-gray-700 hover:bg-gray-50 rounded-md border"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
