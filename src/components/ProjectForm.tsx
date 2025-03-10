import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"
import { ScrollArea } from "./ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "./ui/textarea"
import { Bot, Check, ChevronDown, Circle } from "lucide-react"
import { PROJECT_COLORS } from "@/constants"

//Valores por defecto
const DEFAULT_PROJECT_NAME = 'Untitled';
const DEFAULT_PROJECT_COLOR_NAME = 'Slate';
const DEFAULT_PROJECT_COLOR_HEX = '#64748b';

const DEFAULT_FORM_DATA: Project = {
  id: null,
  name: DEFAULT_PROJECT_NAME,
  color_name: DEFAULT_PROJECT_COLOR_NAME,
  color_hex: DEFAULT_PROJECT_COLOR_HEX,
};

// Tipos
import type { Project, ProjectForm } from "@/types"

type ProjectFormProps = {
  defaultFormData?: Project;
  mode: "create" | "edit";
  onCancel?: () => void;
  onSubmit?: (formData: ProjectForm) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  defaultFormData = DEFAULT_FORM_DATA,
  mode,
  onCancel,
  onSubmit,
}) => {

  const [projectName, setProjectName] = useState<string>(defaultFormData.name || "");
  const [projectNameCharCount, setProjectNameCharCount] = useState<number>(defaultFormData.name.length);

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle>{mode === "create" ? "Add project" : "Edit project"}</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent>
        <div>
          <Label htmlFor="project_name">Name</Label>
          <Input 
            type="text"
            id="project_name"
            className="mt-2 mb-1"
            onInput={() => {}}
            value={projectName}
            maxLength={120}
          />

          <div className="text-xs text-muted-foreground max-w-max ms-auto">0/120</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProjectForm