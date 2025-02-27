import { CalendarIcon, X, Inbox, ChevronDown, Hash } from "lucide-react"
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

        <div className="ring-1 ring-border rounded-md max-w-max">
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

            <PopoverContent className="w-auto p-0 ">
              <Calendar 
                mode="single"
                disabled={{ before: new Date() }}
                initialFocus  
              />
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 -ms-2"
                aria-label="Remove due date"
              >
                <X />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Remove due date
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>

      <Separator />

      <CardFooter>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={false}
              className="max-w-max"
            >
              <Inbox /> Inbox <ChevronDown />
            </Button>
          </PopoverTrigger>

          <PopoverContent>
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
      </CardFooter>
    </Card>
  )
}

export default TaskForm