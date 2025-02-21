
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { User, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Resident {
  id: number;
  name: string;
  unit: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

const mockResidents: Resident[] = [
  {
    id: 1,
    name: "João Silva",
    unit: "101",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Santos",
    unit: "102",
    email: "maria.santos@email.com",
    phone: "(11) 98765-4322",
    status: "Active",
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    unit: "201",
    email: "pedro.oliveira@email.com",
    phone: "(11) 98765-4323",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Ana Costa",
    unit: "202",
    email: "ana.costa@email.com",
    phone: "(11) 98765-4324",
    status: "Active",
  },
  {
    id: 5,
    name: "Lucas Pereira",
    unit: "301",
    email: "lucas.pereira@email.com",
    phone: "(11) 98765-4325",
    status: "Active",
  },
];

interface ResidentsListProps {
  searchTerm: string;
}

const ResidentsList = ({ searchTerm }: ResidentsListProps) => {
  const filteredResidents = mockResidents.filter((resident) =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resident.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredResidents.map((resident) => (
        <Card key={resident.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{resident.name}</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Editar">
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Unit {resident.unit}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">{resident.email}</p>
                <p className="text-sm">{resident.phone}</p>
              </div>
              <div className="mt-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    resident.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {resident.status}
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ResidentsList;
