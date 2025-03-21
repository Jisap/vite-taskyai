

import { Link, useLoaderData, useLocation } from "react-router"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar"
import Logo from "./Logo"
import { UserButton } from "@clerk/clerk-react"
import { CirclePlus, Plus, ChevronRight, Hash, MoreHorizontal } from "lucide-react"
import { SIDEBAR_LINKS } from "@/constants"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip"
import TaskFormDialog from "./TaskFormDialog"
import ProjectFormDialog from "./projectFormDialog"
import { useProjects } from "@/contexts/ProjectContext"
import ProjectActionMenu from "./ProjectActionMenu"
import type { AppLoaderData } from "@/routes/loaders/appLoader"



const AppSidebar = () => {

  const location = useLocation();
  const projects = useProjects();
  const { taskCounts } = useLoaderData()  as AppLoaderData;
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/app/inbox" className="p-2">
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Task create button  */}
              <SidebarMenuItem>
                <TaskFormDialog>
                  <SidebarMenuButton className="!text-primary">
                    <CirclePlus /> Add
                  </SidebarMenuButton>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* sidebar links */}
              {SIDEBAR_LINKS.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.href}
                    onClick={() => {
                      if(isMobile) setOpenMobile(false); // Si estamos en el sidebar en mobile, cerramos el menu al hacer clic en un link
                    }}
                  >
                    <Link to={item.href} className="">
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>

                  {item.href === "/app/inbox" && Boolean(taskCounts.inboxTasks) && (
                    <SidebarMenuBadge>{taskCounts.inboxTasks}</SidebarMenuBadge>
                  )}

                  {item.href === "/app/today" && Boolean(taskCounts.todayTasks) && (
                    <SidebarMenuBadge>{taskCounts.todayTasks}</SidebarMenuBadge>
                  )}
                  
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All projects */}
        <Collapsible 
          className="group/collapsible"
          defaultOpen
        >
          <SidebarGroup>
            <SidebarGroupLabel 
              asChild
              className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"  
            >
              <CollapsibleTrigger>
                <ChevronRight className="me-2 transition-transform group-data-[state=open]/collapsible:rotate-90"/>
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            {/* Project create button  */}
            <Tooltip>
              <ProjectFormDialog method="POST">
                <TooltipTrigger asChild>
                  <SidebarGroupAction aria-label="Add project">
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>
              <TooltipContent side="right">
                Add Project
              </TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects?.documents.slice(0, 5).map(({$id, name, color_name, color_hex}) => (
                    <SidebarMenuItem key={$id}>
                      <SidebarMenuButton 
                        asChild
                        isActive={location.pathname === `/app/projects/${$id}`}
                        onClick={() => {
                          if(isMobile) setOpenMobile(false); // Si estamos en el sidebar en mobile, cerramos el menu al hacer clic en un link
                        }}
                      >
                        <Link to={`/app/projects/${$id}`}>
                          <Hash color={color_hex} />
                          <span>{name}</span>
                        </Link>
                      </SidebarMenuButton>

                      <ProjectActionMenu 
                        defaultFormData={{
                          id: $id,
                          name,
                          color_name,
                          color_hex,
                        }}
                        side="right"
                        align="start"
                      >
                        <SidebarMenuAction 
                          aria-label="More actions"
                          showOnHover
                          className="bg-sidebar-accent"  
                        >
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </ProjectActionMenu>
                    </SidebarMenuItem>
                  ))}

                  {projects !== null && projects.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        asChild
                        className="text-muted-foreground"
                        isActive={location.pathname === "/app/projects"}
                        onClick={() => {
                          if(isMobile) setOpenMobile(false); // Si estamos en el sidebar en mobile, cerramos el menu al hacer clic en un link
                        }}
                      >
                        <Link to="/app/projects">
                        <MoreHorizontal /> All projects
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}


                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className="text-muted-foreground text-sm p-2">
                        Click + to add some project.
                      </p>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <UserButton 
          showName
          appearance={{
            elements: {
              rootBox: "w-full",
              userButtonTrigger: "!shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent",
              userButtonBox: "flex-row-reverse shadow-none gap-2",
              userButtonOuterIdentifier: "ps-0",
              popoverBox: "pointer-events-auto"
            }
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar