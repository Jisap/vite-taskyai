import Head from "@/components/Head"
import TopAppBar from "@/components/TopAppBar"
import { Page, PageHeader, PageTitle } from "@/components/Page"



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
      </Page>
    </>
  )
}

export default InboxPage