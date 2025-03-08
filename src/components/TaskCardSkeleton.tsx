import { Skeleton } from "./ui/skeleton"





const TaskCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[max-content,1fr] gap-3 items-center border-b pt-2 pb-3.5">
      <Skeleton className="w-5 h-5 rounded-full" />
      <Skeleton className="h3 me-10" />
    </div>
  )
}

export default TaskCardSkeleton