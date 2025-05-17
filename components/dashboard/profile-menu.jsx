"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const logoutHandler = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  // Get initials from user name
  const getInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#14B8A6] shadow text-white font-semibold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getInitials()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <div className="p-3 space-y-1">
            <Link
              href="/profile"
              className="flex items-center w-full gap-2 px-3 py-2 text-sm text-[#111827] hover:bg-[#DCFCE7] rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[#14B8A6]">👤</span>
              My Profile
            </Link>

            <Link
              href="/profile/change-password"
              className="flex items-center w-full gap-2 px-3 py-2 text-sm text-[#111827] hover:bg-[#DCFCE7] rounded-md"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-[#14B8A6]">🔒</span>
              Change Password
            </Link>

            <button
              onClick={logoutHandler}
              className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              <span>🚪</span>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
