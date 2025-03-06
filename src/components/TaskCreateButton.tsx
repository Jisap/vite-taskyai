import { Circle, CirclePlus } from "lucide-react"
import { Button } from "./ui/button"
import React from "react"


type TaskCreateButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> // Se crea un nuevo tipo basado en las propiedades de React.ButtonHTMLAttributes<HTMLButtonElement>, excluyendo la propiedad className.


const TaskCreateButton:React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant="link"
      className="w-full justify-start mb-4 px-0"
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  )
}

export default TaskCreateButton