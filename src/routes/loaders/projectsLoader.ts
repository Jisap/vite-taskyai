import { databases, Query } from "@/lib/appwrite";
import { getUserId } from "@/lib/utils";
import type { LoaderFunction } from 'react-router';

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

const getProjects = async(query: string) => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      "projects",
      [
        Query.contains("name", query),
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


const projectsLoader: LoaderFunction = async ({ request }) => { // request es una petición desde fetcher.Form de la busqueda

  const url = new URL(request.url);
  const query = url.searchParams.get("q") || ""; // q es el param que contiene la busqueda
  console.log(query);

  const projects = await getProjects(query)
  console.log("projects",projects);

  return { projects }
}

export default projectsLoader
