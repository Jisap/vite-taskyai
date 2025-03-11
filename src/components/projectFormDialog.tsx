
import { PropsWithChildren, useState } from "react"
import ProjectForm from "./ProjectForm"
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog"

import type { Project } from "@/types"

type ProjectFormDialogProps = {
  defaultFormData?: Project;  
  children: React.ReactNode;
  method: "POST" | "PUT";
}


const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({ defaultFormData, children, method }) => {
  
  const [open, setOpen] = useState<boolean>(false);
  
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* El children se refiere al <Plus /> y cuando se pulsa establece open a true */}
        {children}
      </DialogTrigger>

      <DialogContent className="p-0 border-0 !rounded-xl">
        <ProjectForm 
          mode={method === "POST" ? "create" : "edit"}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectFormDialog