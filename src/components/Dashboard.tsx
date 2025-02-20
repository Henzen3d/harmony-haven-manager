
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", income: 4000, expenses: 2400 },
  { month: "Feb", income: 3000, expenses: 1398 },
  { month: "Mar", income: 2000, expenses: 9800 },
  { month: "Apr", income: 2780, expenses: 3908 },
  { month: "May", income: 1890, expenses: 4800 },
  { month: "Jun", income: 2390, expenses: 3800 },
];

const mockUnits = [
  { id: 1, number: "101", owner: "John Doe", status: "Occupied" },
  { id: 2, number: "102", owner: "Jane Smith", status: "Vacant" },
  { id: 3, number: "103", owner: "Mike Johnson", status: "Occupied" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-medium mb-2">Total Balance</h3>
          <p className="text-3xl font-bold text-primary">R$ 17,578.57</p>
        </Card>
        <Card className="p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-medium mb-2">Monthly Income</h3>
          <p className="text-3xl font-bold text-green-500">R$ 25,450.00</p>
        </Card>
        <Card className="p-6 backdrop-blur-sm bg-white/80">
          <h3 className="text-lg font-medium mb-2">Pending Expenses</h3>
          <p className="text-3xl font-bold text-red-500">R$ 1,578.00</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#9b87f5" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Units</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Unit</th>
                <th className="text-left p-4">Owner</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockUnits.map((unit) => (
                <tr key={unit.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">{unit.number}</td>
                  <td className="p-4">{unit.owner}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      unit.status === "Occupied" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {unit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
