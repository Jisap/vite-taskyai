

import { useState, type PropsWithChildren } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TaskForm from "./TaskForm"
import { useFetcher, useLocation } from "react-router"
import { startOfToday } from "date-fns"



const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  
  const location = useLocation();
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="p-0 border-0 !rounded-xl">
        <TaskForm 
          defaultFormData={{
            content: "",
            due_date: location.pathname === "/app/today" ? startOfToday() : null,  // Establece la fecha de vencimiento en la fecha actual si el usuario está en la página de hoy
            projectId: null,
          }}
          mode="create"
          onCancel={() => setOpen(false)}
          onSubmit={(formData) => {
            fetcher.submit(JSON.stringify(formData),{ // Envía el formulario a la ruta /app con una petición POST
              action: "/app",
              method: "POST",
              encType: "application/json",
            })

            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default TaskFormDialog