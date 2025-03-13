import Header from "@/components/Header"
import { Page, PageHeader, PageList, PageTitle } from "@/components/Page"
import ProjectFormDialog from "@/components/projectFormDialog"
import TopAppBar from "@/components/TopAppBar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCallback, useRef, useState } from "react"
import { useFetcher, useLoaderData } from "react-router"
import { Plus } from 'lucide-react';
import type { Models } from "appwrite";
import Head from "@/components/Head"

type DataType = {
  projects: Models.DocumentList<Models.Document>
}

const ProjectsPage = () => {

  const loaderData = useLoaderData() as DataType;

  const { projects } = loaderData
console.log(projects);
  return (
    <>
      <Head title="My Projects - Tasky AI" />

      <TopAppBar title="My Projects" />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>My Projects</PageTitle>

            <ProjectFormDialog method="POST">
              <Button 
                variant="ghost"
                size="icon"
                className="w-8 h-8"
                aria-label="Create a project"  
              >
                <Plus />
              </Button>
            </ProjectFormDialog>

          </div>
        </PageHeader>

        <PageList>
          <div>
            <div>
              {projects.total} projects
            </div>
          </div>
        </PageList>
      </Page>
    </>
  )
}

export default ProjectsPage