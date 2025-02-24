
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface NewResidentFormProps {
  onClose: () => void;
  initialData?: {
    id: string;
    name: string;
    unit: string;
    email: string | null;
    phone: string;
    status: "Active" | "Inactive";
  };
}

const NewResidentForm = ({ onClose, initialData }: NewResidentFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    unit: initialData?.unit || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    status: initialData?.status || "Active" as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (initialData) {
      // Update existing resident
      const { error } = await supabase
        .from('residents')
        .update({
          name: formData.name,
          unit: formData.unit,
          email: formData.email || null,
          phone: formData.phone,
          status: formData.status,
        })
        .eq('id', initialData.id);

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao atualizar condômino",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Condômino atualizado com sucesso",
      });
    } else {
      // Create new resident
      const { error } = await supabase
        .from('residents')
        .insert({
          name: formData.name,
          unit: formData.unit,
          email: formData.email || null,
          phone: formData.phone,
          status: formData.status,
        });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao cadastrar condômino",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Condômino cadastrado com sucesso",
      });
    }
    
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Nome Completo
        </label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome completo"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="unit" className="text-sm font-medium">
          Unidade
        </label>
        <Input
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          placeholder="Digite o número da unidade"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Digite o email"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Telefone
        </label>
        <Input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Digite o telefone"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select
          value={formData.status}
          onValueChange={(value: "Active" | "Inactive") =>
            setFormData(prev => ({ ...prev, status: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Ativo</SelectItem>
            <SelectItem value="Inactive">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          {initialData ? "Atualizar" : "Salvar"} Condômino
        </Button>
      </div>
    </form>
  );
};

export default NewResidentForm;
