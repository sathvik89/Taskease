import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TrashContent from "@/components/tasks/trash-content";
import { getDeletedTasks } from "@/lib/tasks";

export const metadata = {
  title: "Trash - TaskEase",
};

export default async function TrashPage() {
  const session = await getServerSession(authOptions);
  const deletedTasks = await getDeletedTasks(session?.user.id);

  return <TrashContent initialDeletedTasks={deletedTasks} />;
}
