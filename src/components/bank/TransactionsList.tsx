
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/bank";

interface TransactionsListProps {
  transactions: Transaction[];
  currentBalance: number;
}

export function TransactionsList({ transactions, currentBalance }: TransactionsListProps) {
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
  );
}
