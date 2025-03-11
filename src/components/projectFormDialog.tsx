
import { PropsWithChildren, useState } from "react"
import ProjectForm from "./ProjectForm"
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog"

import type { Project } from "@/types"
import { useFetcher } from "react-router"

type ProjectFormDialogProps = {
  defaultFormData?: Project;  
  children: React.ReactNode;
  method: "POST" | "PUT";
}


const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({ defaultFormData, children, method }) => {
  
  const [open, setOpen] = useState<boolean>(false);
  const fetcher = useFetcher();
  
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
          onSubmit={async(data) => {
            setOpen(false);
            await fetcher.submit(JSON.stringify(data),{
              action: `/app/projects`,
              method,
              encType: "application/json",
            })          
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectFormDialog