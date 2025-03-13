



import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import { startOfToday, startOfTomorrow } from "date-fns";
import type { LoaderFunction } from "react-router";


const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.equal("completed", false),                                    // Only incomplete tasks
        Query.and([
          Query.greaterThanEqual("due_date", startOfToday().toISOString()), // Only tasks due today
          Query.lessThan("due_date", startOfTomorrow().toISOString())       // Only tasks due tomorrow
        ]),
        Query.equal("userId", getUserId()),                                 // Only tasks for the current user
      ]
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting today tasks");
  }
}


const todayTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  console.log(tasks);
  return { tasks }
}

export default todayTaskLoader;