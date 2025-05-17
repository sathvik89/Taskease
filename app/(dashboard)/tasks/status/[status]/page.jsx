import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TasksContent from "@/components/tasks/tasks-content";
import { getTasks } from "@/lib/tasks";

export const metadata = {
  title: "Filtered Tasks - TaskEase",
};

export default async function FilteredTasksPage({ params, searchParams }) {
  const session = await getServerSession(authOptions);

  // Combine params and searchParams
  const filters = {
    status: params.status,
    ...searchParams,
  };

  const tasks = await getTasks(session?.user.id, filters);

  return <TasksContent initialTasks={tasks} initialFilters={filters} />;
}
