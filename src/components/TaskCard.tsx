import type { Models } from "appwrite";
import { Button } from "./ui/button";
import { cn, getTaskDueDateColorClass, getUserId, truncateString } from "@/lib/utils";
import { Check, CalendarDays, Hash, Inbox, Edit, Trash2 } from "lucide-react";
import { formatCustomDate } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import TaskForm from "./TaskForm";
import { useCallback, useState } from "react";
import { useFetcher, useLocation } from "react-router";
import type { Task } from "@/types";
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"



type TaskCardProps = {
  id: string;
  content: string;
  completed: boolean;
  dueDate: Date;
  project: Models.Document | null;
 
}


const TaskCard: React.FC<TaskCardProps> = ({ 
  id, 
  content, 
  completed, 
  dueDate, 
  project,
}) => {

  const [taskFormShow, setTaskFormShow] = useState(false);
  const fetcher = useFetcher();
  const fetcherTask = fetcher.json as Task; // Obtiene la información que se manda al servidor en las peticiones POST y PUT
  const userId = getUserId();
  const location = useLocation();
  

  const task: Task = Object.assign({
    id, 
    content,
    completed,
    due_date: dueDate,
    project: project
      ? {
        id: project.$id, // Mapear $id al id de Project
        name: project.name,
        color_name: project.color_name,
        color_hex: project.color_hex
      }
      : null,
    userId
  },{
    fetcherTask
  })

  const handleTaskComplete = useCallback(async(completed:boolean) => {
    return await fetcher.submit(JSON.stringify({
      id: task.id,
      completed
    }), {
      action: "/app",
      method: "PUT",
      encType: "application/json",
    })
  },[task.id, task.completed])
  
  return (
    <>
      {!taskFormShow && (
        <div className="group/card relative grid grid-cols-[max-content,minmax(0,1fr)] gap-3 border-b">
          {/* Button checkbox */}
          <Button
            variant="outline"
            size="icon"
            className={cn("group/button rounded-full w-5 h-5 mt-2",
              task.completed && "bg-border"
            )}
            role="checkbox"
            aria-checked={task.completed}                                             // Indica el estado la tarea.
            aria-label={`Mark task as ${task.completed ? "incomplete" : "complete"}`} // Describe la acción que se realizará al interactuar con el botón
            aria-describedby="task-content"
            onClick={async() => {
              await handleTaskComplete(!task.completed)

              if(!task.completed){
                toast.success(                                                          // Implementación de toast con Sonner 
                  "Task masked as complete", {
                    action: {
                      label: "Undo",
                      onClick: () => handleTaskComplete(false)
                    },
                    className: "flex justify-between items-center",
                    actionButtonStyle: {
                      backgroundColor: "rgba(252, 103, 4, 0.897)",
                      color: "rgba(255, 255, 255, 0.877)",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0.25rem"
                    }
                  }
                )
              }
            }}
          >
            <Check 
              strokeWidth={4}
              className={cn("!w-3 !h-3 text-muted-foreground group-hover/button:opacity-100 transition-opacity",
                task.completed ? "opacity-100" : "opacity-0"
              )}  
            />
          </Button>

          {/* Contenido de la tarea */}
          <Card className="rounded-none py-2 space-y-1.5 border-none">
            <CardContent className="p-0">
              <p 
                id="task-content"
                className={cn(
                  "text-sm max-md:me-16",
                  task.completed && "text-muted-foreground line-through"
                )}
              >
                {task.content}
              </p>
            </CardContent>

            {/* Footer de la tarea */}
            <CardFooter className="p-0 flex gap-4">
              {task.due_date && location.pathname !== "/app/today" &&( // Se muestra el día de la tarea si no estamos en la página de hoy
                <div className={cn(
                  "flex items-center gap-1 text-xs text-muted-foreground", 
                  getTaskDueDateColorClass(task.due_date, task.completed)
                )}>
                  <CalendarDays size={14} />
                  {formatCustomDate(task.due_date)}
                </div>
              )}

              {/* Si no estas en /app/inbox y tampoco estas en la página de un proyecto, se muestra el nombre del proyecto */}
              {/* Si estas en inbox o en la página de un proyecto no se muestra el nombre del mismo */}
              {location.pathname !== "/app/inbox" && location.pathname !==`/app/projects/${project?.$id}` && (
                <div className="grid grid-cols-[minmax(0,180px),max-content] items-center gap-1 text-xs text-muted-foreground ms-auto">
                  <div className="truncate text-right">
                    {task.project?.name || "Inbox"}
                  </div>
                    {task.project ? (
                      <Hash 
                        size="14" 
                        color={task.project.color_hex}
                      />
                    ) : (
                      <Inbox 
                        size={14}
                        className="text-muted-foreground"  
                      />
                    )}
                </div>
              )}
            </CardFooter>
          </Card>

          {/* Botones de acciones de la tarea */}
          <div className="absolute top-1.5 right-0 bg-background ps-1 shadow-[-10px_0_5px_hst(var(--background))] 
          flex items-center gap-1 opacity-0 group-hover/card:opacity-100 focus-within:opacity-100 max-md:opacity-100">
            {/* Editar tarea */}
            {!task.completed && (
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

            {/* Eliminar tarea */}
            <AlertDialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 text-muted-foreground"
                      aria-label="Delete task"
                    >
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  Delete task
                </TooltipContent>
              </Tooltip>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete task?</AlertDialogTitle>
                
                  <AlertDialogDescription >
                    The <strong>{truncateString(task.content, 48)}</strong> task will be permantently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => {
                      fetcher.submit(JSON.stringify({id: task.id}),{
                        action: "/app",
                        method: "DELETE",
                        encType: "application/json",
                    })}}
                  >Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
          </div>
        </div>
      )}

      {taskFormShow && (
        <TaskForm 
          className="my-1"
          defaultFormData={{
            ...task,
            project: project && project?.$id,
          }}
          mode="edit"
          onCancel={() => setTaskFormShow(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData),{
              action: "/app",
              method: "PUT",
              encType: "application/json",
            });
            setTaskFormShow(false);
          }}
        />
      )}
    </>
  )
}

export default TaskCard