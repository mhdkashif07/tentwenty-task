"use client";

import { useState, useEffect } from "react";
import { Timesheet } from "@/types/Timesheet";

export function useTimesheets() {
  const [items, setItems] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchAll() {
    setLoading(true);
    const res = await fetch("/api/timesheets");
    const data = await res.json();
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchAll();
  }, []);

  async function create(payload: Omit<Timesheet, "id">) {
    const res = await fetch("/api/timesheets", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setItems((s) => [data, ...s]);
    return data;
  }

  async function update(id: string, changes: Partial<Timesheet>) {
    const res = await fetch("/api/timesheets", {
      method: "PUT",
      body: JSON.stringify({ id, ...changes }),
    });
    const data = await res.json();
    setItems((s) => s.map((t) => (t.id === id ? data : t)));
    return data;
  }

  async function remove(id: string) {
    const res = await fetch("/api/timesheets", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data?.success) setItems((s) => s.filter((t) => t.id !== id));
    return data;
  }

  return { items, loading, fetchAll, create, update, remove };
}
