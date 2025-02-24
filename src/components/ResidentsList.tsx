
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { User, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Resident {
  id: string;
  name: string;
  unit: string;
  email: string | null;
  phone: string;
  status: "Active" | "Inactive";
}

interface ResidentsListProps {
  searchTerm: string;
  onEdit: (resident: Resident) => void;
}

const ResidentsList = ({ searchTerm, onEdit }: ResidentsListProps) => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [residentToDelete, setResidentToDelete] = useState<Resident | null>(null);
  const { toast } = useToast();

  const fetchResidents = async () => {
    const { data, error } = await supabase
      .from('residents')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar lista de condôminos",
        variant: "destructive",
      });
      return;
    }

    // Ensure the status is of type "Active" | "Inactive"
    const typedResidents = data?.map(resident => ({
      ...resident,
      status: resident.status as "Active" | "Inactive"
    }));

    setResidents(typedResidents || []);
  };

  useEffect(() => {
    fetchResidents();

    // Subscribe to changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'residents'
        },
        () => {
          fetchResidents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (resident: Resident) => {
    const { error } = await supabase
      .from('residents')
      .delete()
      .eq('id', resident.id);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir condômino",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Condômino excluído com sucesso",
    });
    
    setResidentToDelete(null);
  };

  const filteredResidents = residents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (resident.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResidents.map((resident) => (
          <Card key={resident.id} className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{resident.name}</h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      title="Editar"
                      onClick={() => onEdit(resident)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive" 
                      title="Excluir"
                      onClick={() => setResidentToDelete(resident)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Unit {resident.unit}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">{resident.email}</p>
                  <p className="text-sm">{resident.phone}</p>
                </div>
                <div className="mt-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      resident.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {resident.status}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!residentToDelete} onOpenChange={() => setResidentToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o condômino{" "}
              <span className="font-semibold">{residentToDelete?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => residentToDelete && handleDelete(residentToDelete)}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ResidentsList;
