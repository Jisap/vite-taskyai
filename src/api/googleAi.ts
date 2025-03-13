

import model from "@/lib/googleAI";

export const generateProjectTasks = async( prompt: string) => {
  model.generationConfig = {
    responseMimeType: "application/json",
  }

  try {
    const result = await model.generateContent(`
      Generate and return a list of tasks based on the provided prompt and the given JSON schema.

      Prompt: ${prompt}
      
      Task Schema:
      {
        content: string; 
        due_date: Date | null;
      }

      Requirements:
      1. Ensure tasks aling with the provided prompt.
      2. Set the "due_date" relative to today's date: ${new Date()}.
      3. Return an array of tasks matching the schema.

      Output: Array<Task>
      `
    );

    return  result.response.text();
    
  } catch (error) {
    console.log("Error generating project tasks: ", error);
  }
}