"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiCalendar, FiEdit2, FiTrash2, FiFlag } from "react-icons/fi";
import TaskModal from "./task-modal";
import { useToast } from "@/components/ui/use-toast";
import { updateTask, deleteTask } from "@/lib/api-client";

export default function TaskDetailsContent({ initialTask }) {
  const [task, setTask] = useState(initialTask);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleStatusChange = async (newStatus) => {
    try {
      setLoading(true);
      const updatedTask = await updateTask(task._id, {
        ...task,
        status: newStatus,
      });
      setTask(updatedTask);
      toast({
        title: "Status updated",
        description: `Task status changed to ${
          newStatus === "todo"
            ? "To Do"
            : newStatus === "in-progress"
            ? "In Progress"
            : "Completed"
        }`,
      });
    } catch (err) {
      console.error("Error updating task status:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to update task status",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        setLoading(true);
        await deleteTask(task._id);
        toast({
          title: "Task deleted",
          description: "The task has been moved to trash",
        });
        router.push("/tasks");
      } catch (err) {
        console.error("Error deleting task:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to delete task",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Priority badge classes
  const getPriorityClass = () => {
    switch (task.priority) {
      case "low":
        return "bg-blue-100 text-blue-700";
      case "high":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">
                {task.title}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    task.status === "todo"
                      ? "bg-amber-100 text-amber-700"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.status === "todo"
                    ? "To Do"
                    : task.status === "in-progress"
                    ? "In Progress"
                    : "Completed"}
                </span>
                <span className="text-sm text-gray-500">
                  {task.category || "Other"}
                </span>

                {task.priority && (
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1 ${getPriorityClass()}`}
                  >
                    <FiFlag size={12} />
                    {task.priority.charAt(0).toUpperCase() +
                      task.priority.slice(1)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 text-gray-500 hover:text-[#14B8A6] hover:bg-gray-100 rounded-full transition-colors"
                disabled={loading}
              >
                <FiEdit2 size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
                disabled={loading}
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-gray-500 mb-4">
            <FiCalendar size={16} />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-[#111827] mb-2">
              Description
            </h3>
            <p className="text-gray-600 whitespace-pre-line">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Status Change */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-lg font-medium text-[#111827] mb-3">
              Change Status
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleStatusChange("todo")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  task.status === "todo"
                    ? "bg-amber-100 text-amber-700 border-2 border-amber-300"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-amber-50"
                }`}
                disabled={loading}
              >
                To Do
              </button>
              <button
                onClick={() => handleStatusChange("in-progress")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  task.status === "in-progress"
                    ? "bg-blue-100 text-blue-700 border-2 border-blue-300"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-blue-50"
                }`}
                disabled={loading}
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange("completed")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-green-50"
                }`}
                disabled={loading}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Task Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
        onSuccess={(updatedTask) => {
          setTask(updatedTask);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
