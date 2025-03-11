// components/Sidebar.tsx
import { SidebarProvider, SidebarTrigger } from "@/app/ui/Sidebar"
import { AppSidebar } from "./app-sidebar"
import React from "react";
import { HomeIcon, UserIcon, PhoneIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}


export default Sidebar;
