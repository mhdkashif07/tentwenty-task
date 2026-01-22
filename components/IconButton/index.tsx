"use client";

import React from "react";

export default function IconButton({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
    >
      {children}
    </button>
  );
}
