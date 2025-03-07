import type { Models } from "appwrite";
import { Button } from "./ui/button";
import { cn, getTaskDueDateColorClass } from "@/lib/utils";
import { Check, CalendarDays, Hash, Inbox, Edit, Trash2 } from "lucide-react";
import { formatCustomDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import TaskForm from "./TaskForm";
import { useState } from "react";
import { useFetcher } from "react-router";


type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Document | null;
}


const TaskCard: React.FC<TaskCardProps> = ({ id, content, completed, dueDate, project}) => {

  const [taskFormShow, setTaskFormShow] = useState(false);
  const fetcher = useFetcher();

  return (
    <>
      {!taskFormShow && (
        <div className="group/card relative grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b">
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

          <Card className="rounded-none py-2 space-y-1.5 border-none">
            <CardContent className="p-0">
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

            <CardFooter className="p-0 flex gap-4">
              {dueDate && (
                <div className={cn(
                  "flex items-center gap-1 text-xs text-muted-foreground", 
                  getTaskDueDateColorClass(dueDate, completed)
                )}>
                  <CalendarDays size={14} />
                  {formatCustomDate(dueDate)}
                </div>
              )}

              <div className="grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground ms-auto">
                <div className="truncate text-right">
                  {project?.name || "Inbox"}
                </div>
                  {project ? (
                    <Hash size="14" />
                  ) : (
                    <Inbox 
                      size={14}
                      className="text-muted-foreground"  
                    />
                  )}
                </div>
            </CardFooter>
          </Card>

          <div className="absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hst(var(--background))] 
          flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100">
            {!completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-6 h-6 text-muted-foreground"
                    aria-label="Edit task"  
                    onClick={() => setTaskFormShow(true)}
                  >
                    <Edit />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Edit task
                </TooltipContent>
              </Tooltip>
            )}

            {!completed && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-6 h-6 text-muted-foreground"
                    aria-label="Delete task"
                  >
                    <Trash2 />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Delete task
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      )}

      {taskFormShow && (
        <TaskForm 
          className="my-1"
          defaultFormData={{
            id,
            content,
            due_date: dueDate,
            projectId: project && project?.$id,
          }}
          mode="edit"
          onCancel={() => setTaskFormShow(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData),{
              action: "/app",
              method: "PUT",
              encType: "application/json",
            });
          }}
        />
      )}
    </>
  )
}

export default TaskCard