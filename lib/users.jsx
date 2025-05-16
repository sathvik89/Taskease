// Server-side user functions
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function getUsers() {
  try {
    await connectToDatabase();

    const users = await User.find().select("-password");

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
