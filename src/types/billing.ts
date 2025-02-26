
export interface BillingGeneration {
  id: string;
  reference_month: string;
  name: string;
  due_date: string;
  include_gas: boolean;
  include_water: boolean;
  discount_date?: string;
  discount_type?: 'fixed' | 'percentage';
  discount_value?: number;
  balancete_start_date?: string;
  balancete_end_date?: string;
  additional_message?: string;
  status: 'draft' | 'confirmed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface BillingItem {
  id: string;
  billing_generation_id: string;
  charge_id: string;
  unit_id: string;
  value: number;
  created_at?: string;
  updated_at?: string;
}
