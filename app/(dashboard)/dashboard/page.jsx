import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import DashboardContent from "@/components/dashboard/dashboard-content";
import { getTaskStats } from "@/lib/tasks";

export const metadata = {
  title: "Dashboard - TaskEase",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const stats = await getTaskStats(session?.user.id);

  return <DashboardContent initialStats={stats} />;
}
