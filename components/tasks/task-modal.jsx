// components/tasks/task-modal.jsx
"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { createTask, updateTask } from "@/lib/api-client";

export default function TaskModal({ isOpen, onClose, task, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    category: "Other",
    dueDate: "",
    priority: "medium",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        category: task.category || "Other",
        priority: task.priority || "medium",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
      });
    } else {
      // Reset form for new task
      setFormData({
        title: "",
        description: "",
        status: "todo",
        category: "Other",
        priority: "medium",
        dueDate: "",
      });
    }
    // Clear any previous errors
    setError("");
  }, [task, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.title.trim()) {
        throw new Error("Title is required");
      }

      let result;
      if (task) {
        // Update existing task
        result = await updateTask(task._id, formData);
      } else {
        // Create new task
        result = await createTask(formData);
      }

      if (onSuccess) onSuccess(result);
      onClose();
    } catch (err) {
      console.error("Error saving task:", err);
      setError(err.message || "Failed to save task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#111827]">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Form fields for title, description, status, category, priority, due date */}
          {/* ... (form fields implementation) ... */}

          <div className="flex justify-end space-x-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#14B8A6] hover:bg-teal-600 text-white rounded-md shadow-sm transition-colors disabled:opacity-70"
            >
              {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
