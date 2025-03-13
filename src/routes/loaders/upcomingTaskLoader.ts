import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import { startOfToday } from "date-fns";
import type { LoaderFunction } from "react-router";


const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.equal("completed", false),                                  // Only incomplete tasks
        Query.isNotNull("due_date"),                                      // Only tasks with a due date
        Query.greaterThanEqual("due_date", startOfToday().toISOString()), // Only tasks due today or later
        Query.orderAsc("due_date"),                                       // Order tasks by due date
        Query.equal("userId", getUserId()),                               // Only tasks for the current user
      ]
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting upcoming tasks");
  }
}


const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks }
}

export default upcomingTaskLoader;