import { CalendarIcon, X, Inbox, ChevronDown, Hash, SendHorizonal } from "lucide-react"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { 
  Card,
  CardContent,
  CardFooter,
} from "./ui/card"
import { 
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command"
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "./ui/popover"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { Textarea } from "./ui/textarea"
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip"

import type { ClassValue } from "clsx";
import type { TaskForm } from "@/types";
import { useCallback, useEffect, useState } from "react"
import { formatCustomDate, getTaskDueDateColorClass, cn } from "@/lib/utils"



type TaskFormProps = {
  defaultFormData?: TaskForm;
  className?: ClassValue;
  mode?: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: TaskForm) => void;
}

const DEFAULT_FORM_DATA: TaskForm = {
  content: "",
  due_date: null,
  projectId: null
}

const TaskForm: React.FC<TaskFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  className,
  mode,
  onCancel,
  onSubmit,
}) => {
  const [taskContent, setTaskContent] = useState(defaultFormData.content)
  const [dueDate, setDueDate] = useState(defaultFormData.due_date)
  const [projectId, setProjectId] = useState(defaultFormData.projectId)
  const [projecName, setProjectName] = useState("");
  const [projectColorHex, setProjectColorHex] = useState("");
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [formData, setFormData] = useState(defaultFormData)
  

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content: taskContent,
      due_date: dueDate,
      projectId: projectId,
    }))
  },[taskContent, dueDate, projectId])

  const handleSubmit = useCallback(() => {
    if(!taskContent) return;
  
    if(onSubmit) onSubmit(formData)
    
    setTaskContent("");
  },[taskContent, formData, onSubmit])

  return (
    <Card className="focus-within:border-foreground/30">
      <CardContent className="p-2">
        <Textarea 
          className="!border-0 !ring-0 mb-2 p-1"
          placeholder="After finishing the project, Take a tour"
          autoFocus
          value={taskContent}
          onInput={(e) => setTaskContent(e.currentTarget.value)}
        />

        <div className="ring-1 ring-border rounded-md max-w-max">
          <Popover
            open={dueDateOpen}
            onOpenChange={setDueDateOpen}
          >
            <PopoverTrigger asChild>
              <Button 
                type="button"
                variant="ghost"  
                size="sm"
                className={cn(getTaskDueDateColorClass(dueDate, false))}
              >
                <CalendarIcon /> 
                {dueDate ? formatCustomDate(dueDate) : "Due date"}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0 ">
              <Calendar 
                mode="single"
                disabled={{ before: new Date() }}
                initialFocus
                onSelect={(selected) => {
                  setDueDate(selected || null)
                  setDueDateOpen(false)
                }}  
              />
            </PopoverContent>
          </Popover>

          {dueDate && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-2 -ms-2"
                  aria-label="Remove due date"
                  onClick={() => setDueDate(null)}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Remove due date
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="grid grid-cols-[minmax(0,1fr),max-content] gap-2 p-2">
        <Popover 
          modal
          open={projectOpen}
          onOpenChange={setProjectOpen}  
        >
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={false}
              className="max-w-max"
              onClick={onCancel}
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[240px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search project ..."
              />
              <CommandList>
                <ScrollArea>
                  <CommandEmpty>No project found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem>
                      <Hash /> Project 1
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 2
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 3
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 4
                    </CommandItem>
                    <CommandItem>
                      <Hash /> Project 5
                    </CommandItem>
                  </CommandGroup>
                </ScrollArea>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <span className="max-md:hidden">Cancel</span>
            <X className="md:hidden"/>
          </Button>

          <Button 
            disabled={!taskContent}
            onClick={handleSubmit}  
          >
            <span className="max-md:hidden">
              {mode === "create" ? "Add task" : "Save"}
            </span>
            <SendHorizonal className="md:hidden"/>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TaskForm