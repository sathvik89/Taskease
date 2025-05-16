"use client";

import { createContext, useContext, useState } from "react";

const initialStats = {
  totalTasks: 0,
  todoTasks: 0,
  inProgressTasks: 0,
  completedTasks: 0,
  upcomingTasks: [],
};

const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [stats, setStats] = useState(initialStats);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        deletedTasks,
        setDeletedTasks,
        stats,
        setStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
