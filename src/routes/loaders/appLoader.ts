import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";
import type { LoaderFunction } from "react-router";
import type { Models } from 'appwrite';

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID as string

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
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


const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) {
    redirect("/login");
  }

  const projects = await getProjects();

  return { projects };
}

export default appLoader;
