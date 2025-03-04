import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Outlet } from "react-router"




const AppLayout = () => {
  return (
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
  )
}

export default AppLayout