
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2024, i, 1);
  return {
    value: format(date, "yyyy-MM", { locale: ptBR }),
    label: format(date, "MMMM 'de' yyyy", { locale: ptBR }),
  };
});

interface BillingGeneratorFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function BillingGeneratorForm({ onSuccess, onCancel }: BillingGeneratorFormProps) {
  const { toast } = useToast();
  const [step] = useState(1);
  const [formData, setFormData] = useState({
    reference_month: format(new Date(), "yyyy-MM"),
    name: "",
    due_date: "",
    include_gas: false,
    include_water: false,
    discount_date: "",
    discount_type: "" as "fixed" | "percentage" | "",
    discount_value: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("billing_generations").insert([
        {
          ...formData,
          reference_month: new Date(formData.reference_month + "-01"),
          discount_value: formData.discount_value ? Number(formData.discount_value) : null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Faturamento criado com sucesso.",
      });
      onSuccess();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao criar faturamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Gerador de Faturamento - Passo {step}/4</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reference_month">Referência (Mês/Ano)</Label>
          <Select
            value={formData.reference_month}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, reference_month: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome do Faturamento</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Ex: Faturamento Mensal Janeiro/2024"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="due_date">Data de Vencimento</Label>
          <Input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, due_date: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="include_gas"
              checked={formData.include_gas}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  include_gas: checked as boolean,
                }))
              }
            />
            <Label htmlFor="include_gas">
              Cobrar Consumo de Gás referente ao mês selecionado
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="include_water"
              checked={formData.include_water}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  include_water: checked as boolean,
                }))
              }
            />
            <Label htmlFor="include_water">
              Cobrar Consumo de Água referente ao mês selecionado
            </Label>
          </div>
        </div>

        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium">Desconto por Pontualidade</h3>
          
          <div className="space-y-2">
            <Label htmlFor="discount_date">Até a data</Label>
            <Input
              id="discount_date"
              type="date"
              value={formData.discount_date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, discount_date: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount_type">Tipo de Desconto</Label>
            <Select
              value={formData.discount_type}
              onValueChange={(value: "fixed" | "percentage") =>
                setFormData((prev) => ({ ...prev, discount_type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Valor fixo</SelectItem>
                <SelectItem value="percentage">Porcentagem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.discount_type && (
            <div className="space-y-2">
              <Label htmlFor="discount_value">
                {formData.discount_type === "fixed" ? "Valor" : "Porcentagem"}
              </Label>
              <Input
                id="discount_value"
                type="number"
                step={formData.discount_type === "percentage" ? "0.01" : "1"}
                value={formData.discount_value}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    discount_value: e.target.value,
                  }))
                }
                placeholder={
                  formData.discount_type === "fixed" ? "R$ 0,00" : "0.00%"
                }
              />
            </div>
          )}

          <p className="text-sm text-muted-foreground mt-2">
            ⚠️ A utilização do desconto requer aprovação em Assembleia e outras questões legais.
            Verifique antes de aplicá-lo nas cobranças do Condomínio.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Avançar →</Button>
      </div>
    </form>
  );
}
