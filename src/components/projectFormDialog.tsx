
import { PropsWithChildren } from "react"
import ProjectForm from "./ProjectForm"
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog"




const ProjectFormDialog: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="p-0 border-0 !rounded-xl">
        <ProjectForm 
          mode="create"
        />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectFormDialog