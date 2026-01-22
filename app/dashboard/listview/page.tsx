"use client";

import { useState } from "react";
import TimesheetModal from "@/components/TimesheetModal";

interface Task {
  id: string;
  name: string;
  hours: number;
  projectName: string;
  workType?: string;
  description?: string;
}

interface DayEntry {
  date: string;
  day: string;
  tasks: Task[];
}

export default function Timesheet() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [timesheet, setTimesheet] = useState<DayEntry[]>([
    {
      date: "Jan 21",
      day: "Jan 21",
      tasks: [
        {
          id: "1",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
        {
          id: "2",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
      ],
    },
    {
      date: "Jan 22",
      day: "Jan 22",
      tasks: [
        {
          id: "3",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
        {
          id: "4",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
        {
          id: "5",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
      ],
    },
    {
      date: "Jan 23",
      day: "Jan 23",
      tasks: [
        {
          id: "6",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
        {
          id: "7",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
        {
          id: "8",
          name: "Homepage Development",
          hours: 4,
          projectName: "Project Name",
        },
      ],
    },
  ]);

  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const totalHours = timesheet.reduce(
    (sum, day) =>
      sum + day.tasks.reduce((daySum, task) => daySum + task.hours, 0),
    0,
  );
  const weeklyTarget = 40;
  const percentage = Math.round((totalHours / weeklyTarget) * 100);

  const handleAddTask = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    setIsModalOpen(true);
  };

  const handleSaveTask = (data: {
    projectName: string;
    workType: string;
    description: string;
    hours: number;
  }) => {
    if (selectedDayIndex === null) return;

    const newTask: Task = {
      id: `task-${crypto.randomUUID()}`,
      name: data.description || data.workType,
      hours: data.hours,
      projectName: data.projectName,
      workType: data.workType,
      description: data.description,
    };
    const updatedTimesheet = [...timesheet];
    updatedTimesheet[selectedDayIndex].tasks.push(newTask);
    setTimesheet(updatedTimesheet);
    setIsModalOpen(false);
    setSelectedDayIndex(null);
  };

  const handleDeleteTask = (dayIndex: number, taskId: string) => {
    const updatedTimesheet = [...timesheet];
    updatedTimesheet[dayIndex].tasks = updatedTimesheet[dayIndex].tasks.filter(
      (task) => task.id !== taskId,
    );
    setTimesheet(updatedTimesheet);
    setMenuOpen(null);
  };

  const handleEditTask = () => {
    // TODO: Implement edit functionality
    setMenuOpen(null);
  };

  return (
    <div className="max-w-6xl bg-white shadow rounded-xl my-8 mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              This week&apos;s timesheet
            </h1>
            <p className="text-gray-600">21 - 28 January, 2024</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 min-w-[300px]">
            {/* Progress Bar */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {totalHours}/{weeklyTarget} hrs
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {100}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                  title={`${totalHours}/${weeklyTarget} hours (${percentage}%)`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {timesheet.map((dayEntry, dayIndex) => (
          <div key={dayEntry.date} className="relative">
            {/* Day Label */}
            <div className="flex items-start gap-4">
              <div className="w-16 md:w-24 shrink-0">
                <p className="font-semibold text-gray-900">{dayEntry.day}</p>
              </div>

              {/* Tasks Container */}
              <div className="flex-1">
                <div className="space-y-3">
                  {dayEntry.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="relative bg-white rounded-lg p-3  flex items-center justify-between border border-border hover:shadow-md transition-shadow"
                    >
                      {/* Task Info */}
                      <div className="flex-1 flex justify-between items-center">
                        <p className="text-gray-900 font-medium">{task.name}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                          <span>{task.hours} hrs</span>
                          <a
                            href="#"
                            className="text-[#1E429F] py-1 px-3 rounded-md bg-[#E1EFFE]"
                          >
                            {task.projectName}
                          </a>
                        </div>
                      </div>

                      {/* Menu Button */}
                      <div className="relative ml-4">
                        <button
                          onClick={() =>
                            setMenuOpen(menuOpen === task.id ? null : task.id)
                          }
                          className="text-gray-400 hover:text-gray-600 p-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="6" cy="12" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="18" cy="12" r="2" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {menuOpen === task.id && (
                          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEditTask()}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteTask(dayIndex, task.id)
                              }
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Task Button */}
                  <button
                    onClick={() => handleAddTask(dayIndex)}
                    className="w-full py-3 text-center text-[#1E429F] hover:bg-[#E1EFFE] border border-dotted border-border hover:border-[#1E429F] rounded-lg transition-colors font-medium"
                  >
                    + Add new task
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <TimesheetModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDayIndex(null);
        }}
        onSave={handleSaveTask}
      />
    </div>
  );
}
