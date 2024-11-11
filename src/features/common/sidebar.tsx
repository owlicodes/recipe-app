"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Users,
} from "lucide-react";

import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  Sidebar as UISidebar,
} from "@/components/ui/sidebar";

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const pathName = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Posts", icon: FileText, href: "/admin/posts" },
    { name: "Comments", icon: MessageSquare, href: "/admin/comments" },
    { name: "Users", icon: Users, href: "/admin/users" },
  ];

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
        <UISidebar>
          <SidebarHeader>
            <h2 className="px-4 text-lg font-semibold tracking-tight text-brand">
              RecipeApp Admin
            </h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={pathName.includes(item.name.toLowerCase())}
                  >
                    <Link
                      href={item.href as Route}
                      className="flex items-center"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </UISidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
            <SidebarTrigger />
            <div className="font-semibold">
              {
                menuItems.find((menuItem) =>
                  pathName.includes(menuItem.name.toLowerCase())
                )?.name
              }
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
