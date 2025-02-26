export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bancos: {
        Row: {
          codigo: string | null
          ispb: string | null
          nome_banco: string | null
        }
        Insert: {
          codigo?: string | null
          ispb?: string | null
          nome_banco?: string | null
        }
        Update: {
          codigo?: string | null
          ispb?: string | null
          nome_banco?: string | null
        }
        Relationships: []
      }
      bank_accounts: {
        Row: {
          agencia: string
          bank_code: string
          conta: string
          created_at: string | null
          id: string
          saldo: number | null
          taxa_administracao: number
          tipo_conta: string
          titular: string
          updated_at: string | null
        }
        Insert: {
          agencia: string
          bank_code: string
          conta: string
          created_at?: string | null
          id?: string
          saldo?: number | null
          taxa_administracao: number
          tipo_conta: string
          titular: string
          updated_at?: string | null
        }
        Update: {
          agencia?: string
          bank_code?: string
          conta?: string
          created_at?: string | null
          id?: string
          saldo?: number | null
          taxa_administracao?: number
          tipo_conta?: string
          titular?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      billing_generations: {
        Row: {
          additional_message: string | null
          balancete_end_date: string | null
          balancete_start_date: string | null
          created_at: string
          discount_date: string | null
          discount_type: string | null
          discount_value: number | null
          due_date: string
          id: string
          include_gas: boolean | null
          include_water: boolean | null
          name: string
          reference_month: string
          status: string | null
          updated_at: string
        }
        Insert: {
          additional_message?: string | null
          balancete_end_date?: string | null
          balancete_start_date?: string | null
          created_at?: string
          discount_date?: string | null
          discount_type?: string | null
          discount_value?: number | null
          due_date: string
          id?: string
          include_gas?: boolean | null
          include_water?: boolean | null
          name: string
          reference_month: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          additional_message?: string | null
          balancete_end_date?: string | null
          balancete_start_date?: string | null
          created_at?: string
          discount_date?: string | null
          discount_type?: string | null
          discount_value?: number | null
          due_date?: string
          id?: string
          include_gas?: boolean | null
          include_water?: boolean | null
          name?: string
          reference_month?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      billing_items: {
        Row: {
          billing_generation_id: string | null
          charge_id: string | null
          created_at: string
          id: string
          unit_id: string | null
          updated_at: string
          value: number
        }
        Insert: {
          billing_generation_id?: string | null
          charge_id?: string | null
          created_at?: string
          id?: string
          unit_id?: string | null
          updated_at?: string
          value: number
        }
        Update: {
          billing_generation_id?: string | null
          charge_id?: string | null
          created_at?: string
          id?: string
          unit_id?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "billing_items_billing_generation_id_fkey"
            columns: ["billing_generation_id"]
            isOneToOne: false
            referencedRelation: "billing_generations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_items_charge_id_fkey"
            columns: ["charge_id"]
            isOneToOne: false
            referencedRelation: "charges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billing_items_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      charge_units: {
        Row: {
          charge_id: string | null
          created_at: string
          id: string
          status: string
          unit_id: string | null
          updated_at: string
          value: number
        }
        Insert: {
          charge_id?: string | null
          created_at?: string
          id?: string
          status?: string
          unit_id?: string | null
          updated_at?: string
          value: number
        }
        Update: {
          charge_id?: string | null
          created_at?: string
          id?: string
          status?: string
          unit_id?: string | null
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "charge_units_charge_id_fkey"
            columns: ["charge_id"]
            isOneToOne: false
            referencedRelation: "charges"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charge_units_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      charges: {
        Row: {
          created_at: string
          description: string | null
          document_urls: string[] | null
          due_date: string
          id: string
          is_individual: boolean
          name: string
          periodicity: string
          rateio_method: string | null
          resident_id: string | null
          status: string
          total_value: number
          type: string
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_urls?: string[] | null
          due_date: string
          id?: string
          is_individual?: boolean
          name: string
          periodicity: string
          rateio_method?: string | null
          resident_id?: string | null
          status?: string
          total_value: number
          type: string
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          document_urls?: string[] | null
          due_date?: string
          id?: string
          is_individual?: boolean
          name?: string
          periodicity?: string
          rateio_method?: string | null
          resident_id?: string | null
          status?: string
          total_value?: number
          type?: string
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "charges_resident_id_fkey"
            columns: ["resident_id"]
            isOneToOne: false
            referencedRelation: "residents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "charges_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      cobrancas: {
        Row: {
          created_at: string
          data_vencimento: string
          descricao: string | null
          documentos: string[] | null
          id: string
          leitura: number | null
          metodo_rateio: string | null
          nome: string
          periodicidade: string
          status: string
          tipo: string
          tipo_cobranca: string
          unidades: string[] | null
          updated_at: string
          valor_gas: number | null
          valor_total: number
        }
        Insert: {
          created_at?: string
          data_vencimento: string
          descricao?: string | null
          documentos?: string[] | null
          id?: string
          leitura?: number | null
          metodo_rateio?: string | null
          nome: string
          periodicidade: string
          status?: string
          tipo: string
          tipo_cobranca: string
          unidades?: string[] | null
          updated_at?: string
          valor_gas?: number | null
          valor_total: number
        }
        Update: {
          created_at?: string
          data_vencimento?: string
          descricao?: string | null
          documentos?: string[] | null
          id?: string
          leitura?: number | null
          metodo_rateio?: string | null
          nome?: string
          periodicidade?: string
          status?: string
          tipo?: string
          tipo_cobranca?: string
          unidades?: string[] | null
          updated_at?: string
          valor_gas?: number | null
          valor_total?: number
        }
        Relationships: []
      }
      residents: {
        Row: {
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string
          status: string
          unit: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone: string
          status: string
          unit: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string
          status?: string
          unit?: string
          updated_at?: string
        }
        Relationships: []
      }
      residents_old: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          categoria: string
          conta: string
          created_at: string
          dataPagamento: string | null
          desconto: number | null
          descricao: string | null
          fornecedor: string | null
          id: string
          juros: number | null
          liquidacao: string | null
          multa: number | null
          observacoes: string | null
          referencia: string
          tipo: string
          unidade: string | null
          updated_at: string
          valor: number
          valorPago: number | null
          vencimento: string
        }
        Insert: {
          categoria: string
          conta: string
          created_at?: string
          dataPagamento?: string | null
          desconto?: number | null
          descricao?: string | null
          fornecedor?: string | null
          id?: string
          juros?: number | null
          liquidacao?: string | null
          multa?: number | null
          observacoes?: string | null
          referencia: string
          tipo: string
          unidade?: string | null
          updated_at?: string
          valor: number
          valorPago?: number | null
          vencimento: string
        }
        Update: {
          categoria?: string
          conta?: string
          created_at?: string
          dataPagamento?: string | null
          desconto?: number | null
          descricao?: string | null
          fornecedor?: string | null
          id?: string
          juros?: number | null
          liquidacao?: string | null
          multa?: number | null
          observacoes?: string | null
          referencia?: string
          tipo?: string
          unidade?: string | null
          updated_at?: string
          valor?: number
          valorPago?: number | null
          vencimento?: string
        }
        Relationships: []
      }
      transactions_old: {
        Row: {
          account_type: string
          categoria: string | null
          conta: string | null
          created_at: string
          dataPagamento: string | null
          date: string
          desconto: number | null
          descricao: string | null
          description: string | null
          fornecedor: string | null
          id: string
          juros: number | null
          liquidacao: string | null
          multa: number | null
          observacoes: string | null
          referencia: string | null
          tipo: string | null
          type: string
          unit: string | null
          updated_at: string
          valor: number | null
          valorPago: number | null
          value: number
          vencimento: string | null
        }
        Insert: {
          account_type: string
          categoria?: string | null
          conta?: string | null
          created_at?: string
          dataPagamento?: string | null
          date: string
          desconto?: number | null
          descricao?: string | null
          description?: string | null
          fornecedor?: string | null
          id?: string
          juros?: number | null
          liquidacao?: string | null
          multa?: number | null
          observacoes?: string | null
          referencia?: string | null
          tipo?: string | null
          type: string
          unit?: string | null
          updated_at?: string
          valor?: number | null
          valorPago?: number | null
          value: number
          vencimento?: string | null
        }
        Update: {
          account_type?: string
          categoria?: string | null
          conta?: string | null
          created_at?: string
          dataPagamento?: string | null
          date?: string
          desconto?: number | null
          descricao?: string | null
          description?: string | null
          fornecedor?: string | null
          id?: string
          juros?: number | null
          liquidacao?: string | null
          multa?: number | null
          observacoes?: string | null
          referencia?: string | null
          tipo?: string | null
          type?: string
          unit?: string | null
          updated_at?: string
          valor?: number | null
          valorPago?: number | null
          value?: number
          vencimento?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          area: number | null
          block: string | null
          created_at: string
          floor: number | null
          id: string
          number: number
          percentage: number | null
          updated_at: string
        }
        Insert: {
          area?: number | null
          block?: string | null
          created_at?: string
          floor?: number | null
          id?: string
          number: number
          percentage?: number | null
          updated_at?: string
        }
        Update: {
          area?: number | null
          block?: string | null
          created_at?: string
          floor?: number | null
          id?: string
          number?: number
          percentage?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
