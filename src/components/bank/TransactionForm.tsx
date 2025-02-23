
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Transaction } from "@/types/bank";
import { accountTypes } from "@/types/bank";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, "id">) => void;
  currentBalance: number;
  onCancel: () => void;
}

export function TransactionForm({ onSubmit, currentBalance, onCancel }: TransactionFormProps) {
  const { toast } = useToast();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [formData, setFormData] = useState({
    accountType: "",
    description: "",
    value: "",
    type: "credit" as "credit" | "debit",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma data válida",
        variant: "destructive",
      });
      return;
    }

    if (!formData.accountType) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma conta contábil",
        variant: "destructive",
      });
      return;
    }

    if (!formData.value || parseFloat(formData.value) <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor válido",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      date,
      accountType: formData.accountType,
      description: formData.description,
      value: parseFloat(formData.value),
      type: formData.type,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Saldo Atual:{" "}
          <span className={cn(
            "font-bold",
            currentBalance >= 0 ? "text-green-600" : "text-red-600"
          )}>
            R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Data</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Conta Contábil</label>
        <Select
          value={formData.accountType}
          onValueChange={(value) =>
            setFormData({ ...formData, accountType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a conta contábil" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {accountTypes.map((type) => (
              <SelectItem key={type} value={type} className="cursor-pointer">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo de Grupo</label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={formData.type === "credit" ? "default" : "outline"}
            className={cn(
              "flex-1",
              formData.type === "credit" && "font-bold text-blue-600"
            )}
            onClick={() => setFormData({ ...formData, type: "credit" })}
          >
            Crédito
          </Button>
          <Button
            type="button"
            variant={formData.type === "debit" ? "default" : "outline"}
            className={cn(
              "flex-1",
              formData.type === "debit" && "font-bold text-red-600"
            )}
            onClick={() => setFormData({ ...formData, type: "debit" })}
          >
            Débito
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Descrição</label>
        <Input
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Digite a descrição"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Valor R$</label>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={formData.value}
          onChange={(e) =>
            setFormData({ ...formData, value: e.target.value })
          }
          className={cn(
            formData.type === "credit" ? "text-blue-600" : "text-red-600",
            "font-bold"
          )}
          placeholder="0,00"
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Salvar
        </Button>
      </div>
    </form>
  );
}
