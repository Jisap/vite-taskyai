import type { ActionFunction} from 'react-router';
import type { ProjectForm } from "@/types";
import type { Models } from "appwrite";
import { databases } from '@/lib/appwrite';
import { generateID, getUserId } from '@/lib/utils';
import { redirect } from 'react-router';
import { generateProjectTasks } from "@/api/googleAi";

type aiGenTask = {
  content: string;
  due_date: Date | null;
}

const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;


const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  let aiGeneratedTasks: aiGenTask[] = [];

  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      "projects",
      generateID(),
      {
        name:data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId(),
      }
    )
  } catch (error) {
    console.log("Error creating project: ", error);
  }

  if(aiTaskGen){ // Si se activo la generación de tasks por IA se crean según el prompt
    try {
      aiGeneratedTasks = JSON.parse(await generateProjectTasks(taskGenPrompt) || "")
    } catch (error) {
      console.log("Error generating project tasks: ", error);
    }
  }

  if(aiGeneratedTasks.length){  // Creamos en base de datos las tareas generadas por IA en el proyecto iniciado anteriormente
    const promises = aiGeneratedTasks.map((task) => {
      return databases.createDocument(
        APPWRITE_DATABASE_ID,
        "tasks",
        generateID(),
        {
          ...task,
          project: project?.$id,
          userId: getUserId(),
        }
      )
    })

    try {
      await Promise.all(promises)
    } catch (error) {
      console.log("Error creating project tasks: ", error);
    }
  }


  return redirect(`/app/projects/${project?.$id}`);
}

const projectAction:ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = await request.json();

  console.log(data);
  if(method === "POST"){
    return await createProject(data);
  }

  return null;
}

export default projectAction