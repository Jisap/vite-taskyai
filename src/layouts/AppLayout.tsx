import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet, useLoaderData, useNavigation } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

import { AppLoaderData } from "@/routes/loaders/appLoader"; // type de datos devuelto por la carga de la aplicación
import { ProjectProvider } from "@/contexts/ProjectContext"

const AppLayout = () => {

  const navigation = useNavigation();
  const { projects } = useLoaderData<AppLoaderData>(); // Obtiene los datos de la carga de la aplicación
  const isLoading = navigation.state === "loading" && !navigation.formData;

  return (
    <>
      <ProjectProvider projects={projects}>
        <SidebarProvider>
          <TooltipProvider
            disableHoverableContent
            delayDuration={500}
          >
            <AppSidebar />
            <main className={cn("flex-1", isLoading && "opacity-50 pointer-events-none")}>
              <Outlet />
            </main>
          </TooltipProvider>
        </SidebarProvider>
        <Toaster />
      </ProjectProvider>
    </>
  )
}

export default AppLayout