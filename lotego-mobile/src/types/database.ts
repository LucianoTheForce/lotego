export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  is_broker?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  lot_size: number;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  latitude: number;
  longitude: number;
  status: 'available' | 'reserved' | 'sold';
  images: string[];
  amenities?: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Visit {
  id: string;
  property_id: string;
  client_id: string;
  broker_id?: string;
  scheduled_at: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Commission {
  id: string;
  property_id: string;
  broker_id: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'paid';
  paid_at?: string;
  created_at: string;
  updated_at: string;
}