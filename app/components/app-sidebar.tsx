"use client";
import { ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter, // Import SidebarFooter
} from "@/app/ui/Sidebar";
import { HomeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/ui/dropdown-menu";
import { useState } from "react"; // Add useState to manage sidebar toggle

const items = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "จอง",
    url: "#",
    icon: PhoneIcon,
    hasDropdown: true,
    subItems: [
      { title: "ข้อมูลการจอง", url: "/booking" },
      { title: "แผนก", url: "/add-type" },
      { title: "วันที่", url: "/add-date" },
      { title: "เวลา", url: "/add-time" },
    ],
  },
];

export function AppSidebar() {
  // Manage sidebar collapse state
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Assuming a state for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User");

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          {/* Add the logo in the SidebarHeader */}
          <SidebarHeader>
            <div className="logo-container p-4 flex justify-between">
              {/* Logo */}
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
              {/* Toggle Button for collapsing sidebar */}
            </div>
          </SidebarHeader>

          <SidebarGroupLabel>Meajan</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Iterate over items, including the dropdown for "จอง" */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* Menu item for "จอง" with dropdown trigger */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon />
                        {!collapsed && <span>{item.title}</span>}
                        {item.hasDropdown && <ChevronDown className="ml-auto" />}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    {/* Dropdown content for "จอง" */}
                    {item.hasDropdown && (
                      <DropdownMenuContent>
                        {item.subItems.map((subItem) => (
                          <DropdownMenuItem key={subItem.title}>
                            <a href={subItem.url}>{subItem.title}</a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    )}
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer with Username or Login/Register options */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <span className="flex items-center">
                    {isLoggedIn ? (
                      <span>{username}</span> // Show the username if logged in
                    ) : (
                      <span>Login / Register</span> // If not logged in, show login/register
                    )}
                    <ChevronDown className="ml-auto" />
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top">
                {/* Show login/register options if not logged in */}
                {!isLoggedIn && (
                  <>
                    <DropdownMenuItem>
                      <a href="/login">Login</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/register">Register</a>
                    </DropdownMenuItem>
                  </>
                )}
                {/* Show user options if logged in */}
                {isLoggedIn && (
                  <>
                    <DropdownMenuItem>
                      <a href="/account">Account</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <a href="/logout">Sign Out</a>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
