"use client";

import { useEffect } from "react";
import Sidebar from "./sidebar";

export default function MobileSidebar({ isOpen, onClose }) {
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && e.target instanceof HTMLElement) {
        const sidebarElement = document.getElementById("mobile-sidebar");
        if (sidebarElement && !sidebarElement.contains(e.target)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    // Prevent scrolling when sidebar is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-30 z-40" />

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className="fixed top-0 left-0 w-64 h-full bg-[#FEF9F0] shadow-lg z-50"
      >
        <Sidebar />
      </aside>
    </>
  );
}
