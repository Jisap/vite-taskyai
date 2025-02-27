import { CalendarIcon } from "lucide-react"
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




const TaskForm = () => {
  return (
    <Card className="focus-within:border-foreground/30">
      <CardContent className="p-2">
        <Textarea 
          className="!border-0 !ring-0 mb-2 p-1"
          placeholder="After finishing the project, Take a tour"
          autoFocus
        />

        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                type="button"
                variant="ghost"  
                size="sm"
              >
                <CalendarIcon /> Due date
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <Calendar 
                mode="single"
                disabled={{ before: new Date() }}
                initialFocus  
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}

export default TaskForm