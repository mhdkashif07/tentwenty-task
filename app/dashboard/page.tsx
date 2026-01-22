"use client";

import React, { useState, useMemo } from "react";
import { useTimesheets } from "@/hooks/useTimesheets";
import TimesheetTable from "@/components/TimesheetTable";
import TimesheetModal from "@/components/TimesheetModal";
import { Timesheet } from "@/types/Timesheet";

export default function DashboardPage() {
  const { items, loading, create, update, remove } = useTimesheets();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Timesheet | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    return statusFilter === "all"
      ? items
      : items.filter((i) => i.status === statusFilter);
  }, [items, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function handleSave(payload: Omit<Timesheet, "id">) {
    if (editing) {
      await update(editing.id, payload);
      setEditing(null);
    } else {
      await create(payload);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">Your Timesheets</h3>
          <div>
            <button
              className="text-sm text-gray-600"
              onClick={() => {
                setOpen(true);
                setEditing(null);
              }}
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
              onEdit={(t) => {
                setEditing(t);
                setOpen(true);
              }}
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

      <TimesheetModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSave={async (p) => handleSave(p)}
        initial={editing}
      />
    </div>
  );
}
