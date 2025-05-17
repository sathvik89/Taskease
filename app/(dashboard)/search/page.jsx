"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchTasks } from "@/lib/api-client";
import TaskCard from "@/components/tasks/task-card";
import { FiSearch } from "react-icons/fi";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await searchTasks(query);
        setResults(data);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to search tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <FiSearch size={24} className="text-[#14B8A6]" />
        <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
          Search Results for "{query}"
        </h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#14B8A6]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No results found
          </h3>
          <p className="text-gray-500">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      )}
    </div>
  );
}
