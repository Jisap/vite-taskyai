import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProjectFormDialog from "./projectFormDialog"
import { Button } from "./ui/button"
import { Edit } from "lucide-react"
import type { Project } from '@/types';
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import React from "react";
import ProjectDeleteButton from "./ProjectDeleteButton";



interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({ 
  defaultFormData,
  children,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog 
            method="PUT"
            defaultFormData={defaultFormData}
          >
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start px-2"
              aria-label="Edit project"
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProjectActionMenu