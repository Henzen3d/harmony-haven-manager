
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResidentsList from "@/components/ResidentsList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import NewResidentForm from "@/components/NewResidentForm";

interface Resident {
  id: string;
  name: string;
  unit: string;
  email: string | null;
  phone: string;
  status: "Active" | "Inactive";
}

const Residents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setIsDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <SidebarTrigger />
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-foreground">Condôminos</h1>
              <Dialog 
                open={isDialogOpen} 
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) setEditingResident(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <UserPlus className="size-4" />
                    Novo Condômino
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingResident ? "Editar Condômino" : "Cadastrar Novo Condômino"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingResident 
                        ? "Edite os dados do condômino. Clique em atualizar quando terminar."
                        : "Preencha os dados do novo condômino. Clique em salvar quando terminar."
                      }
                    </DialogDescription>
                  </DialogHeader>
                  <NewResidentForm 
                    onClose={() => setIsDialogOpen(false)} 
                    initialData={editingResident}
                  />
                </DialogContent>
              </Dialog>
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
              <ResidentsList 
                searchTerm={searchTerm} 
                onEdit={handleEdit}
              />
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Residents;
