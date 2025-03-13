import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import type { LoaderFunction } from 'react-router';

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getProjects = async() => {
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
        Query.equal("userId", getUserId()),
        Query.orderDesc("$createdAt"),
      ]
    )
  } catch (error) {
    console.log(error);
    throw new Error("Error getting projects");
  }
}


const projectsLoader: LoaderFunction = async () => {
  const projects = await getProjects()
  return { projects }
}

export default projectsLoader
