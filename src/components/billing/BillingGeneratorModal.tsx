
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BillingGeneratorForm from "./BillingGeneratorForm";

interface BillingGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BillingGeneratorModal({
  open,
  onOpenChange,
}: BillingGeneratorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Gerar Faturamento</DialogTitle>
        </DialogHeader>
        <BillingGeneratorForm
          onSuccess={() => onOpenChange(false)}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
