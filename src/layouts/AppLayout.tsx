import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet, useNavigation } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"



const AppLayout = () => {

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading" && !navigation.formData; 

  return (
    <>
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
    </>
  )
}

export default AppLayout