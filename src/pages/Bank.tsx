import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Receipt } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import TransactionForm from "@/components/bank/TransactionForm";
import { TransactionsList } from "@/components/bank/TransactionsList";
import BillingGeneratorModal from "@/components/billing/BillingGeneratorModal";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Bank() {
  const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
  const [isBillingGeneratorOpen, setIsBillingGeneratorOpen] = useState(false);
  const { toast } = useToast();

  const { data: transactions, refetch: refetchTransactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const handleCreateTransaction = async (values: any) => {
    try {
      const { data, error } = await supabase.from("transactions").insert([
        {
          ...values,
          valor: Number(values.valor),
          valorPago: values.valorPago ? Number(values.valorPago) : null,
          juros: values.juros ? Number(values.juros) : null,
          multa: values.multa ? Number(values.multa) : null,
          desconto: values.desconto ? Number(values.desconto) : null,
        },
      ]);

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Sucesso!",
        description: "Transação criada com sucesso.",
      });
      setIsNewTransactionOpen(false);
      refetchTransactions();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar transação. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Financeiro</h1>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsBillingGeneratorOpen(true)}
                variant="outline"
              >
                <Receipt className="mr-2 h-4 w-4" />
                Gerar Faturamento
              </Button>
              <Button onClick={() => setIsNewTransactionOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </div>
          </div>

          <TransactionsList />

          <Dialog open={isNewTransactionOpen} onOpenChange={setIsNewTransactionOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nova Transação</DialogTitle>
              </DialogHeader>
              <TransactionForm
                onSubmit={handleCreateTransaction}
                onCancel={() => setIsNewTransactionOpen(false)}
                currentBalance={0}
              />
            </DialogContent>
          </Dialog>

          <BillingGeneratorModal
            open={isBillingGeneratorOpen}
            onOpenChange={setIsBillingGeneratorOpen}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
