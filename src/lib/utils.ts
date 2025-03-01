import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { 
  formatRelative,
  isSameYear,
  format,
  isBefore,
  isToday,
  isTomorrow,
  startOfToday,
} from "date-fns";

export function toTitleCase(str: string) {
  return str[0].toUpperCase() + str.slice(1) 
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCustomDate(date: string | number | Date) {

  const today = new Date();
  const relativeDay = toTitleCase(formatRelative(date, today).split(" at ")[0]);

  const relativeDays = ["today", "Tomorrow", "Yesterday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if(relativeDays.includes(relativeDay)) {
    return relativeDay;
  }

  if(isSameYear(date, today)) {
    return format( date, "dd, MMM")
  }else{
    return format(date, "dd, MMM, yyyy")
  }
}

export function getTaskDueDateColorClass(
  dueDate: Date | null, 
  completed?: boolean
): string | undefined {
    
    if(dueDate === null || completed === undefined) return;
    if(isBefore(dueDate, startOfToday()) && !completed){
      return "text-red-500";
    }
    if(isToday(dueDate)){
      return "text-green-500";
    }
    if(isTomorrow(dueDate) && !completed){
      return "text-amber-500"
    }
   

}
