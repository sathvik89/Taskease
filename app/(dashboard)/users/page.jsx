import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import UsersContent from "@/components/users/users-content";
import { getUsers } from "@/lib/users";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Team Members - TaskEase",
};

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  // Check if user is admin
  if (!session?.user.isAdmin) {
    redirect("/dashboard");
  }

  const users = await getUsers();

  return <UsersContent initialUsers={users} />;
}
