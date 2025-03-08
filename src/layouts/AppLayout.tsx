import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"



const AppLayout = () => {
  return (
    <>
      <SidebarProvider>
        <TooltipProvider 
          disableHoverableContent
          delayDuration={500}
        >
          <AppSidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </TooltipProvider>
      </SidebarProvider>
      <Toaster />
    </>
  )
}

export default AppLayout