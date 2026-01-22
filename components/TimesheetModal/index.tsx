"use client";

import React, { useState } from "react";

interface TaskFormData {
  projectName: string;
  workType: string;
  description: string;
  hours: number;
}

const InfoIcon = () => (
  <svg
    className="w-4 h-4 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export default function TimesheetModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
}) {
  const [projectName, setProjectName] = useState("");
  const [workType, setWorkType] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState(12);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      projectName,
      workType,
      description,
      hours,
    });
    // Reset form
    setProjectName("");
    setWorkType("");
    setDescription("");
    setHours(12);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-semibold text-gray-900">Add New Entry</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          {/* Select Project */}
          <div className="mb-4">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
              Select Project <span className="text-red-500">*</span>
              <InfoIcon />
            </label>
            <select
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            >
              <option value="">Project Name</option>
              <option value="Project Alpha">Project Alpha</option>
              <option value="Project Beta">Project Beta</option>
              <option value="Project Gamma">Project Gamma</option>
            </select>
          </div>

          {/* Type of Work */}
          <div className="mb-4">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
              Type of Work <span className="text-red-500">*</span>
              <InfoIcon />
            </label>
            <select
              required
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            >
              <option value="">Select work type</option>
              <option value="Bug fixes">Bug fixes</option>
              <option value="Feature Development">Feature Development</option>
              <option value="Code Review">Code Review</option>
              <option value="Testing">Testing</option>
              <option value="Documentation">Documentation</option>
            </select>
          </div>

          {/* Task Description */}
          <div className="mb-4">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write text here ..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">A note for extra info</p>
          </div>

          {/* Hours */}
          <div className="mb-6">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setHours(Math.max(1, hours - 1))}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                value={hours}
                onChange={(e) => setHours(Math.max(1, Number(e.target.value)))}
                className="w-16 text-center px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setHours(hours + 1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Add entry
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors font-medium rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
