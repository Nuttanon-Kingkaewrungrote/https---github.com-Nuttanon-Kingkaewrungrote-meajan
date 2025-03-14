"use client";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
} from "@/app/ui/Sidebar";
import { useState } from "react";
import { HomeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/ui/dropdown-menu";

// เมนูหลัก
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = (title: string) => {
    setOpenDropdown((prev) => (prev === title ? null : title));
  };

  const handleSignin = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleSignup = () => {
    localStorage.removeItem("token");
    router.push("/register");
  };

  return (
    <SidebarProvider defaultOpen={true}> 
      <Sidebar collapsible="none" defaultOpen={true}> 
        <SidebarContent className="flex flex-col h-full">
          <div className="mb-10 flex justify-center pt-4">
            <img src="/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
          </div>

          <SidebarGroup>
            <SidebarGroupLabel className="text-center">meajan</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        onClick={(e) => {
                          if (item.hasDropdown) {
                            e.preventDefault();
                            toggleDropdown(item.title);
                          }
                        }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-2">
                          <item.icon className="h-6 w-6" />
                          <span className="text-lg">{item.title}</span>
                        </div>
                        {item.hasDropdown && (
                          <ChevronDown
                            className={`ml-2 transition-transform ${
                              openDropdown === item.title ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </a>
                    </SidebarMenuButton>
                    {item.hasDropdown && openDropdown === item.title && (
                      <div className="ml-6 mt-2 space-y-2">
                        {item.subItems?.map((subItem) => (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild>
                              <a href={subItem.url}>{subItem.title}</a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarFooter className="mt-auto">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu onOpenChange={setIsAccountOpen}>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      <User2 className="mr-2" />
                      Account
                      {isAccountOpen ? (
                        <ChevronUp className="ml-auto" />
                      ) : (
                        <ChevronDown className="ml-auto" />
                      )}
                    </SidebarMenuButton>
                  </DropdownMenuTrigger> 
                  <DropdownMenuContent side="top" className="w-full">
                    <DropdownMenuItem onClick={handleSignup} className="cursor-pointer">
                      <span>Sign up</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignin} className="cursor-pointer">
                      <span>Sign in</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}