
import { useState, useEffect } from "react";
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
import { Transaction } from "@/types/bank";

interface TransactionFormProps {
  onSubmit: (transactionData: Omit<Transaction, "id" | "created_at" | "updated_at">) => Promise<void>;
  currentBalance: number;
  onCancel: () => void;
  initialData?: Transaction | null;
}

const TransactionForm = ({ onSubmit, currentBalance, onCancel, initialData }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    accountType: initialData?.accountType || "",
    description: initialData?.description || "",
    value: initialData?.value.toString() || "",
    type: initialData?.type || "credit" as "credit" | "debit",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        date: initialData.date,
        accountType: initialData.accountType,
        description: initialData.description || "",
        value: initialData.value.toString(),
        type: initialData.type,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit({
      date: formData.date,
      accountType: formData.accountType,
      description: formData.description,
      value: Number(formData.value),
      type: formData.type,
    });
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Salvar Transação</Button>
      </div>
    </form>
  );
};

export default TransactionForm;
