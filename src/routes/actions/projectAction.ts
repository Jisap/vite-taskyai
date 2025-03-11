import type { ActionFunction} from 'react-router';
import type { ProjectForm } from "@/types";


const projectAction:ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = await request.json();

  console.log(data);

  return null;
}

export default projectAction