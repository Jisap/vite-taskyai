import AppSidebar from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
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
        <SidebarTrigger />
        <div>AppLayout</div>
        <Outlet />
      </TooltipProvider>
    </SidebarProvider>
  )
}

export default AppLayout