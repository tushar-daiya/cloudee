"use client";
import React from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserAvatar() {
  const router = useRouter();
  const { data: session, isPending, error } = authClient.useSession();
  return (
    <SidebarMenu className="space-y-4">
      <SidebarMenuItem>
        {!!!isPending && (
          <>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session?.user?.image as string | undefined}
                  alt={session?.user?.name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name}
                </span>
                <span className="truncate text-xs">{session?.user?.email}</span>
              </div>
            </div>
          </>
        )}
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push("/auth");
                },
              },
            });
          }}
        >
          <LogOut />
          Sign Out
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
