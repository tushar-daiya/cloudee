"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  useSidebar,
} from "./ui/sidebar";
import Image from "next/image";
import { Files, Key, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import UserAvatar from "./UserAvatar";
const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    logo: <LayoutDashboard />,
  },
  {
    name: "Api Keys",
    href: "/dashboard/api-keys",
    logo: <Key />,
  },
  {
    name: "Media Explorer",
    href: "/dashboard/media",
    logo: <Files />,
  },
];
export default function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size={"lg"}>
          <div className="flex items-center space-x-2 p-2">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={open ? 40 : 20}
              height={open ? 40 : 20}
            />
            <span className="text-2xl font-bold">Cloudee</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="px-2">
        {navItems.map((item, index) => (
          <SidebarMenuButton key={index} asChild>
            <Link href={item.href}>
              {item.logo}
              <span>{item.name}</span>
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserAvatar />
      </SidebarFooter>
    </Sidebar>
  );
}
