import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import type { Models } from 'appwrite';


const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string

type TaskCounts = {
  inboxTasks: number;
  todayTasks: number;

}

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
  TaskCounts: TaskCounts;
}



const getProjects = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "projects",
      [
        Query.select([
          "$id",
          "name",
          "color_name",
          "color_hex",
          "$createdAt"
        ]),
        Query.orderDesc("$createdAt"),
        Query.limit(100),
        Query.equal("userId", getUserId()),
      ]
    );
  } catch (error) {
    console.log("Error getting projects: ", error);
    throw new Error("Error getting projects");
  }
}

const getTaskCounts = async () => {
  const taskCounts: TaskCounts = {
    inboxTasks: 0,
    todayTasks: 0,
  }
  
  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.select(["$id"]),
        Query.isNull("project"),
        Query.equal("completed", false),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ]
    );

    taskCounts.inboxTasks = totalInboxTasks;

  } catch (error) {
    console.log(error);
    throw new Error("Error getting inbox task counts");
  }

  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "tasks",
      [
        Query.select(["$id"]),
        Query.and([
          Query.greaterThanEqual("due_date", startOfToday().toISOString()),
          Query.lessThan("due_date", startOfTomorrow().toISOString()),
        ]),
        Query.equal("completed", false),
        Query.limit(1),
        Query.equal("userId", getUserId()),
      ]
    );
   
    console.log("totalTodayTasks", totalTodayTasks);
    taskCounts.todayTasks = totalTodayTasks;

  } catch (error) {
    console.log(error);
    throw new Error("Error getting inbox task counts");
  }

  return taskCounts;
}


const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) {
    redirect("/login");
  }

  const projects = await getProjects();
  const taskCounts = await getTaskCounts();

  return { projects, taskCounts };
}

export default appLoader;
