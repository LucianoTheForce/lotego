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
      commissions: {
        Row: {
          broker_commission_amount: number
          broker_commission_rate: number
          broker_id: string | null
          buyer_id: string | null
          created_at: string
          dispute_reason: string | null
          id: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          platform_commission_amount: number
          platform_commission_rate: number
          property_id: string
          resolved_at: string | null
          resolved_by: string | null
          sale_date: string
          sale_price: number
          seller_id: string
          status: string | null
          total_commission_amount: number
          updated_at: string
        }
        Insert: {
          broker_commission_amount: number
          broker_commission_rate?: number
          broker_id?: string | null
          buyer_id?: string | null
          created_at?: string
          dispute_reason?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          platform_commission_amount: number
          platform_commission_rate?: number
          property_id: string
          resolved_at?: string | null
          resolved_by?: string | null
          sale_date: string
          sale_price: number
          seller_id: string
          status?: string | null
          total_commission_amount: number
          updated_at?: string
        }
        Update: {
          broker_commission_amount?: number
          broker_commission_rate?: number
          broker_id?: string | null
          buyer_id?: string | null
          created_at?: string
          dispute_reason?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          platform_commission_amount?: number
          platform_commission_rate?: number
          property_id?: string
          resolved_at?: string | null
          resolved_by?: string | null
          sale_date?: string
          sale_price?: number
          seller_id?: string
          status?: string | null
          total_commission_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "commissions_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: Json | null
          avatar_url: string | null
          broker_license: string | null
          commission_rate: number | null
          company_name: string | null
          created_at: string
          document_number: string | null
          document_type: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          updated_at: string
          user_type: string | null
        }
        Insert: {
          address?: Json | null
          avatar_url?: string | null
          broker_license?: string | null
          commission_rate?: number | null
          company_name?: string | null
          created_at?: string
          document_number?: string | null
          document_type?: string | null
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          updated_at?: string
          user_type?: string | null
        }
        Update: {
          address?: Json | null
          avatar_url?: string | null
          broker_license?: string | null
          commission_rate?: number | null
          company_name?: string | null
          created_at?: string
          document_number?: string | null
          document_type?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          updated_at?: string
          user_type?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          access_road: string | null
          address: Json
          area_sqm: number
          city: string
          coordinates: unknown | null
          created_at: string
          description: string | null
          documents: Json | null
          favorites_count: number | null
          features: Json | null
          id: string
          images: Json | null
          is_featured: boolean | null
          latitude: number | null
          longitude: number | null
          neighborhood: string | null
          owner_id: string
          postal_code: string | null
          price: number
          property_type: string | null
          state: string
          status: string | null
          terrain_type: string | null
          title: string
          updated_at: string
          utilities: Json | null
          views_count: number | null
          zoning: string | null
        }
        Insert: {
          access_road?: string | null
          address: Json
          area_sqm: number
          city: string
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          documents?: Json | null
          favorites_count?: number | null
          features?: Json | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          neighborhood?: string | null
          owner_id: string
          postal_code?: string | null
          price: number
          property_type?: string | null
          state: string
          status?: string | null
          terrain_type?: string | null
          title: string
          updated_at?: string
          utilities?: Json | null
          views_count?: number | null
          zoning?: string | null
        }
        Update: {
          access_road?: string | null
          address?: Json
          area_sqm?: number
          city?: string
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          documents?: Json | null
          favorites_count?: number | null
          features?: Json | null
          id?: string
          images?: Json | null
          is_featured?: boolean | null
          latitude?: number | null
          longitude?: number | null
          neighborhood?: string | null
          owner_id?: string
          postal_code?: string | null
          price?: number
          property_type?: string | null
          state?: string
          status?: string | null
          terrain_type?: string | null
          title?: string
          updated_at?: string
          utilities?: Json | null
          views_count?: number | null
          zoning?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          broker_id: string | null
          broker_notes: string | null
          cancelled_at: string | null
          cancelled_by: string | null
          cancelled_reason: string | null
          confirmation_code: string | null
          contact_info: Json | null
          created_at: string
          duration_minutes: number | null
          feedback: string | null
          id: string
          notes: string | null
          property_id: string
          rating: number | null
          reminder_sent: boolean | null
          scheduled_date: string
          status: string | null
          updated_at: string
          visit_type: string | null
          visitor_id: string
          visitor_notes: string | null
        }
        Insert: {
          broker_id?: string | null
          broker_notes?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          cancelled_reason?: string | null
          confirmation_code?: string | null
          contact_info?: Json | null
          created_at?: string
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          notes?: string | null
          property_id: string
          rating?: number | null
          reminder_sent?: boolean | null
          scheduled_date: string
          status?: string | null
          updated_at?: string
          visit_type?: string | null
          visitor_id: string
          visitor_notes?: string | null
        }
        Update: {
          broker_id?: string | null
          broker_notes?: string | null
          cancelled_at?: string | null
          cancelled_by?: string | null
          cancelled_reason?: string | null
          confirmation_code?: string | null
          contact_info?: Json | null
          created_at?: string
          duration_minutes?: number | null
          feedback?: string | null
          id?: string
          notes?: string | null
          property_id?: string
          rating?: number | null
          reminder_sent?: boolean | null
          scheduled_date?: string
          status?: string | null
          updated_at?: string
          visit_type?: string | null
          visitor_id?: string
          visitor_notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "visits_broker_id_fkey"
            columns: ["broker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_cancelled_by_fkey"
            columns: ["cancelled_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_visitor_id_fkey"
            columns: ["visitor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database
  }
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
  TableName extends PublicTableNameOrOptions extends {
    schema: keyof Database
  }
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