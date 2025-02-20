
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ResidentsList from "@/components/ResidentsList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const Residents = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <SidebarTrigger />
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-foreground">Condôminos</h1>
            </div>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar condôminos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <ResidentsList searchTerm={searchTerm} />
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Residents;
