import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/lib/models/task";

// GET /api/tasks - Get all tasks for a user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const sortBy = searchParams.get("sortBy");
    const priority = searchParams.get("priority");

    // Build query
    const query = { createdBy: session.user.id, isDeleted: false };

    if (status) query.status = status;
    if (category) query.category = category;
    if (priority) query.priority = priority;

    // Create sort object
    const sort = {};
    if (sortBy === "dueDate") {
      sort.dueDate = 1; // Ascending
    } else {
      sort.createdAt = -1; // Descending (newest first)
    }

    await connectToDatabase();
    const tasks = await Task.find(query).sort(sort);

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, status, category, dueDate, priority } =
      await request.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const newTask = new Task({
      title,
      description,
      status: status || "todo",
      category: category || "Other",
      priority: priority || "medium",
      dueDate,
      createdBy: session.user.id,
    });

    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
