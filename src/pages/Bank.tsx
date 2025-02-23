
import { useState } from "react";
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
import { TransactionForm } from "@/components/bank/TransactionForm";
import { TransactionsList } from "@/components/bank/TransactionsList";
import { Transaction } from "@/types/bank";

const Bank = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const currentBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "credit" 
      ? acc + transaction.value 
      : acc - transaction.value;
  }, 1250.75);

  const handleSubmit = (transactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      ...transactionData,
    };

    setTransactions(prev => [...prev, newTransaction]);
    toast({
      title: "Sucesso",
      description: "Movimentação bancária registrada com sucesso",
    });
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
                  <TransactionForm 
                    onSubmit={handleSubmit}
                    currentBalance={currentBalance}
                    onCancel={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <TransactionsList 
              transactions={transactions}
              currentBalance={currentBalance}
            />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Bank;
