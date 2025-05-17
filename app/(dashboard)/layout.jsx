import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import Sidebar from "@/components/dashboard/sidebar";
import Navbar from "@/components/dashboard/navbar";

export default async function DashboardLayout({ children }) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex bg-[#FEF9F0] text-[#111827] relative overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-[#FEF9F0] border-r border-gray-200 shadow-md z-20">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <div className="sticky top-0 z-30">
          <Navbar />
        </div>
        <div className="flex-1 px-4 py-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
