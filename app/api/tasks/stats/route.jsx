import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/lib/models/task";

// GET /api/tasks/stats - Get task statistics
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const totalTasks = await Task.countDocuments({
      createdBy: session.user.id,
      isDeleted: false,
    });

    const todoTasks = await Task.countDocuments({
      createdBy: session.user.id,
      status: "todo",
      isDeleted: false,
    });

    const inProgressTasks = await Task.countDocuments({
      createdBy: session.user.id,
      status: "in-progress",
      isDeleted: false,
    });

    const completedTasks = await Task.countDocuments({
      createdBy: session.user.id,
      status: "completed",
      isDeleted: false,
    });

    const upcomingTasks = await Task.find({
      createdBy: session.user.id,
      dueDate: { $gte: new Date() },
      status: { $ne: "completed" },
      isDeleted: false,
    })
      .sort({ dueDate: 1 })
      .limit(5);

    return NextResponse.json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      upcomingTasks,
    });
  } catch (error) {
    console.error("Error fetching task stats:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
