"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const isTimesheets = pathname === "/dashboard";
  const isListView = pathname === "/dashboard/listview";

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="text-xl font-bold">ticktock</div>
          <nav className="flex gap-6 text-sm font-medium">
            <button
              onClick={() => router.push("/dashboard")}
              className={
                isTimesheets
                  ? "text-gray-700"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              Timesheets
            </button>
            <button
              onClick={() => router.push("/dashboard/listview")}
              className={
                isListView
                  ? "text-gray-700"
                  : "text-gray-500 hover:text-gray-700"
              }
            >
              List View
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {session?.user?.name || "John Doe"}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-gray-700"
            title="Logout"
          >
            ▼
          </button>
        </div>
      </div>
    </header>
  );
}
