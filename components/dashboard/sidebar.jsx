"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const linkData = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: "📊",
  },
  {
    label: "Tasks",
    link: "/tasks",
    icon: "📋",
  },
  {
    label: "Completed",
    link: "/tasks/completed",
    icon: "✅",
  },
  {
    label: "In Progress",
    link: "/tasks/in-progress",
    icon: "⏳",
  },
  {
    label: "To Do",
    link: "/tasks/todo",
    icon: "📝",
  },
  {
    label: "Team",
    link: "/users",
    icon: "👥",
  },
  {
    label: "Trash",
    link: "/bin",
    icon: "🗑️",
  },
];

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Filter links based on user role
  const sidebarLinks = session?.user?.isAdmin ? linkData : linkData.slice(0, 5);

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-[#FEF9F0] border-r border-gray-200">
      <div className="flex gap-2 items-center">
        <div className="bg-[#14B8A6] text-4xl font-extrabold p-3 rounded-full shadow">
          📚
        </div>
        <h1 className="text-2xl font-bold text-[#111827]">TaskEase</h1>
      </div>

      <div className="flex-1 flex flex-col gap-4 mt-6">
        {sidebarLinks.map((item) => {
          const isActive = pathname.startsWith(item.link);
          return (
            <Link
              key={item.label}
              href={item.link}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-[#111827] hover:bg-[#E0F2F1] transition ${
                isActive ? "bg-[#14B8A6] text-white" : ""
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="pt-4">
        <button className="w-full flex gap-2 p-2 items-center text-lg text-[#111827] hover:text-[#14B8A6]">
          <span>⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
