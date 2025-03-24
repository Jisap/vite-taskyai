import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import type { LoaderFunction } from "react-router";


const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.equal("completed", true),                                   // Only completed tasks
        Query.orderDesc("$updatedAt"),                                    // Order tasks by updated date
        Query.equal("userId", getUserId()),                               // Only tasks for the current user
      ]
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting completed tasks");
  }
}


const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks }
}

export default completedTaskLoader;