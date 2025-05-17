import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/lib/models/task";

// GET /api/tasks/trash - Get deleted tasks
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const tasks = await Task.find({
      createdBy: session.user.id,
      isDeleted: true,
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching deleted tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
