import { truncateString } from "@/lib/utils"
import { useCallback } from "react"
import { useFetcher, useLocation, useNavigate } from "react-router"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"
import { Project } from "@/types"


type ProjectDeleteButtonProps = {
  defaultFormData: Project
}


const ProjectDeleteButton:React.FC<ProjectDeleteButtonProps> = ({ defaultFormData }) => {
  
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();

  const handleProjectDelete = useCallback(async() => {

    if (location.pathname === `/app/projects/${defaultFormData.id}`) { // Si el proyecto que se está eliminando es el mismo que el proyecto actualmente visible en la URL 
      navigate("/app/inbox");                                          // volvemos a la página de inbox para evitar ver un proyecto que no existe (404 error)
    }

    const toastId = toast.loading("Deleting Project...", {
      duration: Infinity
    })

    try {
      await fetcher.submit(defaultFormData, {
        action: "/app/projects",
        method: "DELETE",
        encType: "application/json",
      })

      toast.success("Project deleted", {
        id: toastId,
        description: `The project ${truncateString(defaultFormData.name, 32)} has been deleted successfully`,
        duration: 5000
      })

    } catch (error) {
      console.log("error deleting project: ", error);
      toast.success("Error deleting project", {
        id: toastId,
        description: `An error occurred while deleting the project ${truncateString(defaultFormData.name, 32)}`,
        duration: 5000
      })
    }
  },[defaultFormData])

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start px-2 !text-destructive" 
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription >
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{' '} 
            project and all tasks will be permantently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleProjectDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ProjectDeleteButton