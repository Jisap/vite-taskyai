import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page, PageHeader, PageList, PageTitle } from "@/components/Page"
import TaskEmptyState from "@/components/TaskEmptyState"
import { useLoaderData } from "react-router"
import { Models } from "appwrite"
import TaskCard from "@/components/TaskCard"



const CompletedTaskPage = () => {


  const { tasks } = useLoaderData<{ tasks: Models.DocumentList<Models.Document> }>(); // tipado basado en la configuración de la tabla en Appwrite

  return (
    <>
      <Head title="Completed - Tasky AI" />
      <TopAppBar
        title="Completed"
      />

      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>
        </PageHeader>

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

          {!tasks.total && (
            <TaskEmptyState type="completed" />
          )}


        </PageList>
      </Page>
    </>
  )
}

export default CompletedTaskPage