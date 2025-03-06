import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import type { LoaderFunction } from "react-router";


const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getTasks = async() => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.equal("completed", false),    // Only incomplete tasks
        Query.isNull("projectId"),          // Only tasks without a project
        Query.equal("userId", getUserId()), // Only tasks for the current user
      ]
    );
  } catch (error) {
    console.log(error);
    throw new Error("Error getting inbox tasks");
  }
}


const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();
  return { tasks }
}

export default inboxTaskLoader;