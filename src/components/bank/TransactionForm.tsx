
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Transaction } from "@/types/bank";

interface TransactionFormProps {
  onClose: () => void;
}

const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    accountType: "",
    description: "",
    value: "",
    type: "credit" as "credit" | "debit",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date().toISOString();
    const transaction = {
      date: formData.date,
      account_type: formData.accountType,
      description: formData.description,
      value: Number(formData.value),
      type: formData.type,
      created_at: now,
      updated_at: now,
    };

    const { error } = await supabase
      .from("transactions")
      .insert([transaction]);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao cadastrar transação",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Transação cadastrada com sucesso",
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Data</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, date: e.target.value }))
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo</Label>
        <Select
          value={formData.type}
          onValueChange={(value: "credit" | "debit") =>
            setFormData((prev) => ({ ...prev, type: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit">Entrada</SelectItem>
            <SelectItem value="debit">Saída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountType">Tipo de Conta</Label>
        <Input
          id="accountType"
          value={formData.accountType}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, accountType: e.target.value }))
          }
          placeholder="Ex: Conta Corrente"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Ex: Pagamento de Energia"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="value">Valor</Label>
        <Input
          id="value"
          type="number"
          step="0.01"
          value={formData.value}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, value: e.target.value }))
          }
          placeholder="0.00"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Transação</Button>
      </div>
    </form>
  );
};

export default TransactionForm;
