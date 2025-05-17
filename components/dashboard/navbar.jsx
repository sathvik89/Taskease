"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import ProfileMenu from "./profile-menu";
import MobileSidebar from "./mobile-sidebar";
import SearchBar from "@/components/SearchBar";

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center bg-[#FEF9F0] px-6 py-3 sticky top-0 z-20 shadow-sm border-b border-gray-200">
        {/* Mobile Sidebar Toggle Button */}
        <button
          className="md:hidden p-2 rounded-md text-[#14B8A6]"
          onClick={() => setMobileOpen(true)}
        >
          <span className="text-xl">☰</span>
        </button>

        {/* Left side: Logo + Search */}
        <div className="flex items-center gap-6 w-full max-w-4xl">
          {/* Search input */}
          <div className="hidden sm:flex items-center flex-1 max-w-md">
            <SearchBar placeholder="Search tasks, projects..." />
          </div>
        </div>

        {/* Right side: Notifications + Profile */}
        <div className="flex items-center gap-6">
          <button
            aria-label="Notifications"
            className="relative text-[#14B8A6] hover:text-[#0d9488] transition-colors duration-200 text-2xl"
          >
            <span>🔔</span>
            <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-[#FEF9F0]" />
          </button>

          <ProfileMenu />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
