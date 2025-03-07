
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <SidebarTrigger />
          <Dashboard />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
