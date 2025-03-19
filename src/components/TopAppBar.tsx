import { useEffect, useState } from "react";
import Kbd from "./Kbd"
import { SidebarTrigger } from "./ui/sidebar"
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip"
import { cn } from "@/lib/utils";


type TopAppBarProps = {
  title: string;
  taskCount?: number;
}

const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {

  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70);           // Si la página se desplaza, muestra el título
    
    listener()
    window.addEventListener("scroll", listener)
    
    return() => window.removeEventListener("scroll", listener)
  },[])

  return (
    <div className={cn(
        "sticky z-40 top-0 h-14 bg-background grid grid-cols-[40px,minmax(0,1fr),40px] items-center px-4",
        showTitle && "border-b"
    )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent className="flex items-center">
          <p>
            Toggle sidebar
          </p>
          <Kbd kbdList={['Ctrl', 'B']}/>
        </TooltipContent>
      </Tooltip>

      <div className={cn(
        "max-w-[480px] mx-auto text-center transition-[transform,opacity]",
        showTitle ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      )}
      >
        <h1 className="font-semibold truncate">{title}</h1>
        { Boolean(taskCount) && ( // Si hay tareas, muestra el número de tareas 
          <div className="text-xs text-muted-foreground">
            {taskCount} tasks
          </div>
        )}
      </div>
    </div>
  )
}

export default TopAppBar