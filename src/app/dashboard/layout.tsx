import DashboardSidebar from "@/components/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="absolute inset-0 w-full p-2 h-10">
          <SidebarTrigger />
        </div>
        <div className="mt-10">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
