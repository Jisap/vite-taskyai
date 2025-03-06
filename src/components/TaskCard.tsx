import type { Models } from "appwrite";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, CalendarDays } from "lucide-react";
import { formatCustomDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Document | null;
}


const TaskCard: React.FC<TaskCardProps> = ({ id, content, completed, dueDate, project}) => {
  return (
    <div>
      <Button
        variant="outline"
        size="icon"
        className={cn("group/button rounded-full w-5 h-5 mt-2",
          completed && "bg-border"
        )}
        role="checkbox"
        aria-checked={completed}                                             // Indica el estado la tarea.
        aria-label={`Mark task as ${completed ? "incomplete" : "complete"}`} // Describe la acción que se realizará al interactuar con el botón
        aria-describedby="task-content"
      >
        <Check 
          strokeWidth={4}
          className={cn("!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity",
            completed ? "opacity-100" : "opacity-0"
          )}  
        />
      </Button>

      <Card>
        <CardContent>
          <p 
            id="task-content"
            className={cn(
              "text-sm max-md:me-16",
              completed && "text-muted-foreground line-through"
            )}
          >
            {content}
          </p>
        </CardContent>

        <CardFooter>
          <div className="">
            <CalendarDays />
            {formatCustomDate(dueDate)}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TaskCard