
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/bank";

interface TransactionsListProps {
  transactions: Transaction[];
  currentBalance: number;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionsList({ transactions, currentBalance, onEdit, onDelete }: TransactionsListProps) {
  return (
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
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "font-bold",
                    transaction.type === "credit" ? "text-blue-600" : "text-red-600"
                  )}>
                    {transaction.type === "credit" ? "+" : "-"}
                    R$ {transaction.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(transaction)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta movimentação? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(transaction.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
