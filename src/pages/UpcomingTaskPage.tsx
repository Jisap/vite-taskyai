import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page, PageHeader, PageList, PageTitle } from "@/components/Page"
import TaskEmptyState from "@/components/TaskEmptyState"
import { useLoaderData } from "react-router"
import { Models } from "appwrite"
import TaskCard from "@/components/TaskCard"
import { CheckCircle2 } from "lucide-react"




const UpcomingTaskPage = () => {

  
  const { tasks } = useLoaderData<{ tasks: Models.DocumentList<Models.Document> }>(); // tipado basado en la configuración de la tabla en Appwrite
  
  return (
    <>
      <Head title="Upcoming - Tasky AI" />
      <TopAppBar
        title="Upcoming"
        taskCount={tasks.total}
      />

      <Page>
        <PageHeader>
          <PageTitle>Upcoming</PageTitle>
        </PageHeader>

        {tasks.total > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CheckCircle2 size={16} /> {tasks.total} tasks
          </div>
        )}

        <PageList>
          {tasks.documents.map(({ $id, content, completed, due_date, project }) => (
            <TaskCard
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}

            />
          ))}

          { !tasks.total && (
            <TaskEmptyState type="upcoming" />
          )}

          
        </PageList>
      </Page>
    </>
  )
}

export default UpcomingTaskPage