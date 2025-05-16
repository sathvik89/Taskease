// Server-side task functions
import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/lib/models/task";

export async function getTasks(userId, filters = {}) {
  if (!userId) return [];

  try {
    await connectToDatabase();

    const { status, category, sortBy, priority } = filters;
    const query = { createdBy: userId, isDeleted: false };

    // Add filters if provided
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

    const tasks = await Task.find(query).sort(sort);
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

export async function getTaskById(userId, taskId) {
  if (!userId) return null;

  try {
    await connectToDatabase();

    const task = await Task.findOne({
      _id: taskId,
      createdBy: userId,
    });

    if (!task) return null;

    return JSON.parse(JSON.stringify(task));
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

export async function getDeletedTasks(userId) {
  if (!userId) return [];

  try {
    await connectToDatabase();

    const tasks = await Task.find({
      createdBy: userId,
      isDeleted: true,
    });

    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error("Error fetching deleted tasks:", error);
    return [];
  }
}

export async function getTaskStats(userId) {
  if (!userId) {
    return {
      totalTasks: 0,
      todoTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
      upcomingTasks: [],
    };
  }

  try {
    await connectToDatabase();

    const totalTasks = await Task.countDocuments({
      createdBy: userId,
      isDeleted: false,
    });

    const todoTasks = await Task.countDocuments({
      createdBy: userId,
      status: "todo",
      isDeleted: false,
    });

    const inProgressTasks = await Task.countDocuments({
      createdBy: userId,
      status: "in-progress",
      isDeleted: false,
    });

    const completedTasks = await Task.countDocuments({
      createdBy: userId,
      status: "completed",
      isDeleted: false,
    });

    const upcomingTasks = await Task.find({
      createdBy: userId,
      dueDate: { $gte: new Date() },
      status: { $ne: "completed" },
      isDeleted: false,
    })
      .sort({ dueDate: 1 })
      .limit(5);

    return {
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      upcomingTasks: JSON.parse(JSON.stringify(upcomingTasks)),
    };
  } catch (error) {
    console.error("Error fetching task stats:", error);
    return {
      totalTasks: 0,
      todoTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
      upcomingTasks: [],
    };
  }
}
