import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const accountTypes = [
  "Ajuste de Saldo Crédito",
  "Ajuste de Saldo Débito",
  "Chamada de Capital",
  "Cheque Compensado",
  "Cobrança de Energia",
  "Cobrança de Internet",
  "Compra de Imóvel",
  "Compra de Material",
  "Compra de Terreno",
  "Condomínio",
  "Contas a Pagar",
  "Contas a Receber",
  "Correção Monetária Ativo",
  "Correção Monetária Passivo",
  "Custo de Construção",
  "Empréstimo",
  "Folha de Pagamento",
  "Honorários Advocatícios",
  "Imposto de Renda",
  "Impostos e Taxas",
  "Juros",
  "Multas",
  "Outras Despesas",
  "Outras Receitas",
  "Pagamento de Juros",
  "Pagamento de Principal",
  "Provisão de Devedores Duvidosos",
  "Reembolso",
  "Remuneração de Capital Próprio",
  "Repasse de Aluguel",
  "Resgate de Aplicação",
  "Salários",
  "Seguros",
  "Serviços Contratados",
  "Transferência Bancária",
  "Venda de Ativo",
  "Venda de Imóvel",
  "Venda de Terreno",
  "Venda de Unidade",
];

const Bank = () => {
  const [date, setDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountType: "",
    description: "",
    value: "",
    type: "credit", // credit or debit
  });

  const currentBalance = 1250.75; // Este valor viria do backend

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsDialogOpen(false);
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
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: ptBR }) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Conta Contábil</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a conta contábil" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountTypes.map((type) => (
                            <SelectItem key={type} value={type}>
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
              {/* Aqui você pode adicionar a tabela de movimentações bancárias */}
              <div className="text-center text-muted-foreground">
                Nenhuma movimentação encontrada
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Bank;
