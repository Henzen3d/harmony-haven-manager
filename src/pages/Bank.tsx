
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { useToast } from "@/components/ui/use-toast";
import TransactionForm from "@/components/bank/TransactionForm";
import { TransactionsList } from "@/components/bank/TransactionsList";
import { Transaction } from "@/types/bank";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth } from "date-fns";
import type { Database } from "@/integrations/supabase/types";

type DbTransaction = Database['public']['Tables']['transactions']['Row'];

const Bank = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const currentBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "credit" 
      ? acc + transaction.value 
      : acc - transaction.value;
  }, 0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const mapDbToTransaction = (dbTransaction: DbTransaction): Transaction => ({
    id: dbTransaction.id,
    date: dbTransaction.date,
    accountType: dbTransaction.account_type,
    description: dbTransaction.description,
    value: dbTransaction.value,
    type: dbTransaction.type as "credit" | "debit",
    created_at: dbTransaction.created_at,
    updated_at: dbTransaction.updated_at
  });

  const fetchTransactions = async () => {
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());
    
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString())
      .order('date', { ascending: false });

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao carregar movimentações",
        variant: "destructive",
      });
      return;
    }

    const mappedTransactions = (data || []).map(mapDbToTransaction);
    setTransactions(mappedTransactions);
  };

  const handleSubmit = async (transactionData: Omit<Transaction, "id">) => {
    if (editingTransaction) {
      const { error } = await supabase
        .from('transactions')
        .update({
          date: transactionData.date,
          account_type: transactionData.accountType,
          description: transactionData.description,
          value: transactionData.value,
          type: transactionData.type,
        })
        .eq('id', editingTransaction.id);

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao atualizar movimentação",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Movimentação atualizada com sucesso",
      });
    } else {
      const { error } = await supabase
        .from('transactions')
        .insert({
          date: transactionData.date,
          account_type: transactionData.accountType,
          description: transactionData.description,
          value: transactionData.value,
          type: transactionData.type,
        });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao registrar movimentação",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Movimentação registrada com sucesso",
      });
    }

    await fetchTransactions();
    setIsDialogOpen(false);
    setEditingTransaction(null);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir movimentação",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Sucesso",
      description: "Movimentação excluída com sucesso",
    });
    await fetchTransactions();
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
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setEditingTransaction(null);
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Movimentação
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTransaction ? "Editar Movimentação" : "Nova Movimentação"}
                    </DialogTitle>
                  </DialogHeader>
                  <TransactionForm 
                    onSubmit={handleSubmit}
                    currentBalance={currentBalance}
                    onCancel={() => {
                      setIsDialogOpen(false);
                      setEditingTransaction(null);
                    }}
                    initialData={editingTransaction}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <TransactionsList 
              transactions={transactions}
              currentBalance={currentBalance}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Bank;
