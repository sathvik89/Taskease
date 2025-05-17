import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TaskDetailsContent from "@/components/tasks/task-details-content";
import { getTaskById } from "@/lib/tasks";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Task Details - TaskEase",
};

export default async function TaskDetailsPage({ params }) {
  const session = await getServerSession(authOptions);
  const task = await getTaskById(session?.user.id, params.id);

  if (!task) {
    notFound();
  }

  return <TaskDetailsContent initialTask={task} />;
}
