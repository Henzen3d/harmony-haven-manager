import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";

const accountTypes = [
  "Ajuste de Saldo Crédito",
  "Ajuste de Saldo Débito",
  "Chamada de Capital",
  "Cheque Compensado",
  "Cobrança de Energia",
  "Cobrança de Internet",
  "Cobrança Segurança Condomínio",
  "Cobrança Vaga de Garagem",
  "Consertos Gerais",
  "Consumo de Água",
  "Consumo de Energia",
  "Consumo de Gás",
  "Desconto Concedido",
  "Desconto Recebido",
  "Despesas Bancárias",
  "Estorno de Cheque Compensado",
  "Estorno de Pagamento",
  "Estorno de Recebimento",
  "Fundo de Reserva",
  "Jardinagem",
  "Chaveiro",
  "Outras Conservação e Limpeza",
  "Outras Despesas Fixas",
  "Outras Despesas Manutenção",
  "Outros Encargos Sociais",
  "Pagamento Água",
  "Pagamento Limpeza Fossa",
  "Pagamento Consertos Gerais",
  "Pagamento Contribuição Confederativa",
  "Pagamento Contribuição Sindical",
  "Pagamento DARF",
  "Pagamento de Água",
  "Pagamento de Internet",
  "Pagamento de Multa/Juro",
  "Pagamento Encanador",
  "Pagamento Esc. Contabilidade",
  "Pagamento FGTS",
  "Pagamento Gás",
  "Pagamento INSS",
  "Pagamento Jardineiro",
  "Pagamento Remuneração Síndico",
  "Pagamento Seguro Condomínio",
  "Pagamento Sistema de Gestão",
  "Pagamento Telefonia",
  "Pagamento Título Antecipado",
  "Pagamento Título Pago em Atraso",
  "Pagamento Vigilância",
  "Provisão Férias e 13 Salário",
  "Rateio Ajuste de Saldo Débito",
  "Rateio Cheque Compensado",
  "Rateio Cobrança de Internet",
  "Rateio Cobrança Segurança Condomínio",
  "Rateio Consertos Gerais",
  "Rateio Desconto Concedido",
  "Rateio Despesas Bancárias",
  "Rateio Estorno de Recebimento",
  "Rateio Jardinagem",
  "Rateio Chaveiro",
  "Rateio Outras Conservação e Limpeza",
  "Rateio Outras Despesas Fixas",
  "Rateio Outras Despesas Manutenção",
  "Rateio Outros Encargos Sociais",
  "Rateio Pagamento Água",
  "Rateio Pagamento Auto Fossa",
  "Rateio Pagamento Consertos Gerais",
  "Rateio Pagamento Contribuição Confederativa",
  "Rateio Pagamento Contribuição Sindical",
  "Rateio Pagamento DARF",
  "Rateio Pagamento de Água",
  "Rateio Pagamento de Internet",
  "Rateio Pagamento de Multa/Juro",
  "Rateio Pagamento Encanador",
  "Rateio Pagamento Energia",
  "Rateio Pagamento Esc. Contabilidade",
  "Rateio Pagamento FGTS",
  "Rateio Pagamento Gás",
  "Rateio Pagamento INSS",
  "Rateio Pagamento Jardineiro",
  "Rateio Pagamento Remuneração Síndico",
  "Rateio Pagamento Seguro Condomínio",
  "Rateio Pagamento Sistema de Gestão",
  "Rateio Pagamento Telefonia",
  "Rateio Pagamento Vigilância",
  "Rateio Provisão Férias e 13 Salário",
  "Rateio Saldo Inicial Débito",
  "Rateio Segurança Condomínio",
  "Rateio Tarifa Bancária",
  "Recebimento de Boleto",
  "Recebimento de Boleto em Atraso",
  "Recebimento de Boleto Pago Antecipado",
  "Recebimento de Fatura de Cartão",
  "Recebimento de Multa/Juro",
  "Recebimento Índice",
  "Saldo Inicial Crédito",
  "Saldo Inicial Débito",
  "Segurança Condomínio",
  "Tarifa Bancária",
  "Taxa de Acordo",
  "Taxa de Mudança",
  "Taxa de Uso de Área Comum",
  "Taxa extra",
  "Taxa Quadra de Tênis",
  "Taxa Salão de Festas",
  "Taxa Segunda Via Boleto",
  "Transferência entre contas - entrada",
  "Transferência entre contas - saida",
  "Valor do Condominio"
];

interface Transaction {
  id: string;
  date: string;
  accountType: string;
  description: string;
  value: number;
  type: "credit" | "debit";
}

const Bank = () => {
  const { toast } = useToast();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState({
    accountType: "",
    description: "",
    value: "",
    type: "credit" as "credit" | "debit",
  });

  const currentBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "credit" 
      ? acc + transaction.value 
      : acc - transaction.value;
  }, 1250.75);

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

    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      date,
      accountType: formData.accountType,
      description: formData.description,
      value: parseFloat(formData.value),
      type: formData.type,
    };

    setTransactions(prev => [...prev, newTransaction]);

    toast({
      title: "Sucesso",
      description: "Movimentação bancária registrada com sucesso",
    });

    setIsDialogOpen(false);
    setFormData({
      accountType: "",
      description: "",
      value: "",
      type: "credit",
    });
    setDate(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <SidebarTrigger />
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold">Banco/Caixa</h1>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Movimentação
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Nova Movimentação Bancária</DialogTitle>
                  </DialogHeader>
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
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Salvar
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="p-6">
              {transactions.length === 0 ? (
                <div className="text-center text-muted-foreground">
                  Nenhuma movimentação encontrada
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="font-bold text-lg mb-4">
                    Saldo Atual:{" "}
                    <span className={cn(
                      currentBalance >= 0 ? "text-green-600" : "text-red-600"
                    )}>
                      R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="space-y-1">
                          <div className="font-medium">{transaction.accountType}</div>
                          <div className="text-sm text-gray-500">
                            {format(new Date(transaction.date), "dd/MM/yyyy")}
                            {transaction.description && ` - ${transaction.description}`}
                          </div>
                        </div>
                        <div className={cn(
                          "font-bold",
                          transaction.type === "credit" ? "text-blue-600" : "text-red-600"
                        )}>
                          {transaction.type === "credit" ? "+" : "-"}
                          R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Bank;
