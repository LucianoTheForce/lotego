export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'buyer' | 'seller' | 'agent' | 'admin'
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'buyer' | 'seller' | 'agent' | 'admin'
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'buyer' | 'seller' | 'agent' | 'admin'
        }
      }
      properties: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          owner_id: string
          title: string
          description: string | null
          price: number
          area_size: number
          location: Json
          address: string
          city: string
          state: string
          zip_code: string
          property_type: 'lot' | 'land' | 'farm'
          status: 'active' | 'sold' | 'inactive'
          images: string[]
          features: string[]
          coordinates: {
            lat: number
            lng: number
          }
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          owner_id: string
          title: string
          description?: string | null
          price: number
          area_size: number
          location?: Json
          address: string
          city: string
          state: string
          zip_code: string
          property_type: 'lot' | 'land' | 'farm'
          status?: 'active' | 'sold' | 'inactive'
          images?: string[]
          features?: string[]
          coordinates: {
            lat: number
            lng: number
          }
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          owner_id?: string
          title?: string
          description?: string | null
          price?: number
          area_size?: number
          location?: Json
          address?: string
          city?: string
          state?: string
          zip_code?: string
          property_type?: 'lot' | 'land' | 'farm'
          status?: 'active' | 'sold' | 'inactive'
          images?: string[]
          features?: string[]
          coordinates?: {
            lat: number
            lng: number
          }
        }
      }
      visits: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          property_id: string
          visitor_id: string
          agent_id: string | null
          scheduled_date: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          property_id: string
          visitor_id: string
          agent_id?: string | null
          scheduled_date: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          property_id?: string
          visitor_id?: string
          agent_id?: string | null
          scheduled_date?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          notes?: string | null
        }
      }
      commissions: {
        Row: {
          id: string
          created_at: string
          property_id: string
          agent_id: string | null
          sale_price: number
          commission_rate: number
          commission_amount: number
          platform_fee: number
          agent_fee: number
          status: 'pending' | 'paid' | 'disputed'
        }
        Insert: {
          id?: string
          created_at?: string
          property_id: string
          agent_id?: string | null
          sale_price: number
          commission_rate: number
          commission_amount: number
          platform_fee: number
          agent_fee: number
          status?: 'pending' | 'paid' | 'disputed'
        }
        Update: {
          id?: string
          created_at?: string
          property_id?: string
          agent_id?: string | null
          sale_price?: number
          commission_rate?: number
          commission_amount?: number
          platform_fee?: number
          agent_fee?: number
          status?: 'pending' | 'paid' | 'disputed'
        }
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
  }
}