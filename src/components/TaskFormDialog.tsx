

import type { PropsWithChildren } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TaskForm from "./TaskForm"


const TaskFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        { children }
      </DialogTrigger>
      <DialogContent className="p-0 border-0 !rounded-xl">
        <TaskForm />
      </DialogContent>
    </Dialog>
  )
}

export default TaskFormDialog