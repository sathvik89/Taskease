import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TasksContent from "@/components/tasks/tasks-content";
import { getTasks } from "@/lib/tasks";

export const metadata = {
  title: "Tasks - TaskEase",
};

export default async function TasksPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const tasks = await getTasks(session?.user.id, searchParams);

  return <TasksContent initialTasks={tasks} initialFilters={searchParams} />;
}
