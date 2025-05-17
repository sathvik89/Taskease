"use client";

import { useState } from "react";
import { FiTrash2, FiRefreshCw, FiFlag } from "react-icons/fi";
import { useToast } from "@/components/ui/use-toast";
import {
  restoreTask,
  permanentDeleteTask,
  fetchDeletedTasks,
} from "@/lib/api-client";

export default function TrashContent({ initialDeletedTasks }) {
  const [deletedTasks, setDeletedTasks] = useState(initialDeletedTasks);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refreshDeletedTasks = async () => {
    try {
      setLoading(true);
      const tasks = await fetchDeletedTasks();
      setDeletedTasks(tasks);
    } catch (err) {
      console.error("Error fetching deleted tasks:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to refresh trash",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id) => {
    try {
      setLoading(true);
      await restoreTask(id);
      await refreshDeletedTasks();
      toast({
        title: "Task restored",
        description: "The task has been restored successfully",
      });
    } catch (err) {
      console.error("Error restoring task:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to restore task",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePermanentDelete = async (id) => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      try {
        setLoading(true);
        await permanentDeleteTask(id);
        await refreshDeletedTasks();
        toast({
          title: "Task deleted permanently",
          description: "The task has been permanently deleted",
        });
      } catch (err) {
        console.error("Error permanently deleting task:", err);
        toast({
          title: "Error",
          description: err.message || "Failed to delete task permanently",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Priority badge classes
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-700";
      case "high":
        return "bg-red-100 text-red-700";
      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
        Trash
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14B8A6]"></div>
        </div>
      ) : deletedTasks.length > 0 ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deletedTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[#111827]">
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {task.description || "No description"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {task.category || "Other"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {task.priority && (
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full inline-flex items-center gap-1 ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          <FiFlag size={10} />
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {task.dueDate
                          ? formatDate(task.dueDate)
                          : "No due date"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRestore(task._id)}
                          className="p-1.5 text-[#14B8A6] hover:bg-[#E0F2F1] rounded-full transition-colors"
                          title="Restore"
                          disabled={loading}
                        >
                          <FiRefreshCw size={16} />
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(task._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete Permanently"
                          disabled={loading}
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Trash is empty
          </h3>
          <p className="text-gray-500">
            Items you delete will appear here for 30 days before being
            permanently removed.
          </p>
        </div>
      )}
    </div>
  );
}
