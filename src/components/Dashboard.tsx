
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, endOfMonth } from "date-fns";
import { Transaction } from "@/types/bank";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const startDate = startOfMonth(new Date());
    const endDate = endOfMonth(new Date());
    
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .gte('date', startDate.toISOString())
      .lte('date', endDate.toISOString());

    if (!error && data) {
      // Map the database fields to our frontend Transaction type
      const mappedTransactions = data.map(t => ({
        id: t.id,
        date: t.date,
        accountType: t.account_type, // Map account_type to accountType
        description: t.description,
        value: t.value,
        type: t.type as "credit" | "debit",
        created_at: t.created_at,
        updated_at: t.updated_at
      }));
      setTransactions(mappedTransactions);
    }
    setIsLoading(false);
  };

  const currentBalance = transactions.reduce((acc, transaction) => {
    return transaction.type === "credit" 
      ? acc + transaction.value 
      : acc - transaction.value;
  }, 0);

  const monthlyIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((acc, t) => acc + t.value, 0);

  const pendingExpenses = transactions
    .filter(t => t.type === "debit")
    .reduce((acc, t) => acc + t.value, 0);

  const chartData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.date).getDate();
    const existingDay = acc.find(d => d.day === date);
    
    if (existingDay) {
      if (transaction.type === "credit") {
        existingDay.income += transaction.value;
      } else {
        existingDay.expenses += transaction.value;
      }
    } else {
      acc.push({
        day: date,
        income: transaction.type === "credit" ? transaction.value : 0,
        expenses: transaction.type === "debit" ? transaction.value : 0,
      });
    }
    
    return acc;
  }, []).sort((a, b) => a.day - b.day);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral financeira</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-medium mb-2">Saldo Total</h3>
          <p className={cn(
            "text-3xl font-bold",
            currentBalance >= 0 ? "text-green-600" : "text-red-600"
          )}>
            R$ {currentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-medium mb-2">Receitas do Mês</h3>
          <p className="text-3xl font-bold text-green-500">
            R$ {monthlyIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
        <Card className="p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-medium mb-2">Despesas do Mês</h3>
          <p className="text-3xl font-bold text-red-500">
            R$ {pendingExpenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Movimentações do Mês</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                name="Receitas"
                stroke="#22c55e" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                name="Despesas"
                stroke="#ef4444" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
