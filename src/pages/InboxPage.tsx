import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page, PageHeader, PageList, PageTitle } from "@/components/Page"
import TaskCreateButton from "@/components/TaskCreateButton"
import TaskEmptyState from "@/components/TaskEmptyState"
import TaskForm from "@/components/TaskForm"
import { useState } from "react"
import { useFetcher, useLoaderData } from "react-router"
import { Models } from "appwrite"
import TaskCard from "@/components/TaskCard"
import TaskCardSkeleton from "@/components/TaskCardSkeleton"




const InboxPage = () => {

  const fetcher = useFetcher();
  const { tasks } = useLoaderData<{tasks: Models.DocumentList<Models.Document>}>(); // tipado basado en la configuración de la tabla en Appwrite
  const [taskFormShow, setTaskFormShow] = useState(false);

  return (
    <>
      <Head title="Inbox - Tasky AI" />
      <TopAppBar 
        title="Inbox"
        taskCount={ tasks.total }
      />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageList>
          {tasks.documents.map(({ $id, content, completed, due_date, project}) => (
            <TaskCard 
              key={$id}
              id={$id}
              content={content}
              completed={completed}
              dueDate={due_date}
              project={project}
              
            />
          ))}

          {fetcher.state !== "idle" && <TaskCardSkeleton />}

          {!taskFormShow && (
            <TaskCreateButton 
              onClick={() => setTaskFormShow(true)}   
            />
          )}

          {!taskFormShow && !tasks.total &&(
            <TaskEmptyState type="inbox"/>
          )}

          {taskFormShow && (
            <TaskForm 
              mode="create" 
              className="mt-5"  
              onCancel={() => setTaskFormShow(false)}
              onSubmit={(formData) => {
                fetcher.submit(JSON.stringify(formData),{
                  action: "/app",
                  method: "POST",
                  encType: "application/json",
                });
              }}
            />
          )}
        </PageList>
      </Page>
    </>
  )
}

export default InboxPage