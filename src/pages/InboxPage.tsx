import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page, PageHeader, PageList, PageTitle } from "@/components/Page"
import TaskCreateButton from "@/components/TaskCreateButton"
import TaskEmptyState from "@/components/TaskEmptyState"



const InboxPage = () => {
  return (
    <>
      <Head title="Inbox -Tasky AI" />
      <TopAppBar 
        title="Inbox"
        taskCount={20}
      />

      <Page>
        <PageHeader>
          <PageTitle>Inbox</PageTitle>
        </PageHeader>

        <PageList>
          <TaskCreateButton />

          <TaskEmptyState type="inbox"/>
        </PageList>
      </Page>
    </>
  )
}

export default InboxPage