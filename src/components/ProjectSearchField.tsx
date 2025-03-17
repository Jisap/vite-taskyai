import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Loader2, Search } from "lucide-react"
import React from "react";


export type SearchingState = "idle" | "loading" | "searching"; // idle, no se esta realizando ninguna busqueda, loading cuando se espera una resp del  server y searching cuando el usuario esta escribiendo en el input

type ProjectSearchFieldProps = {
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  searchingState: SearchingState;
}

const ProjectSearchField: React.FC<ProjectSearchFieldProps> = ( { handleChange, searchingState } ) => {
  return (
    <div className="relative">
      <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none"/>
      <Input 
        type="text"
        name="q"
        placeholder="Search projects"
        className="px-8"
        onChange={handleChange}
      />
      <Loader2 
        size={18} 
        className={cn(
          "absolute top-2 text-muted-foreground pointer-events-none hidden",
          searchingState !== "idle" && "block animate-spin"
        )}  
      />

    </div>
  )
}

export default ProjectSearchField