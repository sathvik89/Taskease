import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { TaskProvider } from "@/components/providers/task-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskEase - Task Management App",
  description: "Manage all your tasks in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TaskProvider>
            {children}
            <Toaster />
          </TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
