import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { TaskProvider } from "@/components/providers/task-provider";

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
          <TaskProvider>{children}</TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
