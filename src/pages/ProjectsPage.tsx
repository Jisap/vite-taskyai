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
import ProjectCard from "@/components/ProjectCard"
import ProjectSearchField from "@/components/ProjectSearchField"
import type { SearchingState } from "@/components/ProjectSearchField"

const SEARCH_TIMEOUT_DELAY = 500; 

type DataType = {
  projects: Models.DocumentList<Models.Document>
}

const ProjectsPage = () => {

  const loaderData = useLoaderData() as DataType; // Recuperamos los datos del loader (base de datos)

  const { projects } = loaderData;

  const fetcher = useFetcher();

  const [searchingState, setSearchingState] = useState<SearchingState>("idle");

  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleProjectSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if(searchTimeout.current) {                           // Limpieza del tiempo de espera anterior
      clearTimeout(searchTimeout.current);
    }

    const submitTarget = e.currentTarget.form            // Obtenemos el formulario (fetcher.Form) que contiene el input en <ProejctSearchField /> que disparo el evento onChange
  
    searchTimeout.current = setTimeout(async() => {      // Establecimiento de un nuevo tiempo de espera
      setSearchingState("searching");
      await fetcher.submit(submitTarget);                // Envio de la solicitud de busqueda GET a "/app/projects
      setSearchingState("idle");
    }, SEARCH_TIMEOUT_DELAY)

    setSearchingState("loading")
  },[])

  return (
    <>
      <Head title="My Projects - Tasky AI" />

      <TopAppBar title="My Projects" />

      <Page>
        <PageHeader>
          <div className="flex items-center gap-2">
            <PageTitle>My Projects</PageTitle>

            {/* Botón para crear un nuevo proyecto */}
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

          {/* Realiza solicitudes de formulario sin recargar la página */}
          <fetcher.Form
            method="GET"
            action="/app/projects"
          >
            <ProjectSearchField 
              handleChange={handleProjectSearch}
              searchingState={searchingState}
            />
          </fetcher.Form>
        </PageHeader>

        {/* Lista de proyectos */}
        <PageList>
          <div className="h-8 flex items-center border-b">
            <div className="text-sm">
              {projects.total} projects
            </div>
          </div>

          <div>
            {projects.documents.map((project) => (
              <ProjectCard 
                key={project.$id}
                project={project}  
              />
            ))}
          </div>
        </PageList>
      </Page>
    </>
  )
}

export default ProjectsPage