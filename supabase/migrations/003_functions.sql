-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to search properties by location
CREATE OR REPLACE FUNCTION search_properties_by_location(
  lat DECIMAL,
  lng DECIMAL,
  radius_km INTEGER DEFAULT 10
)
RETURNS SETOF properties AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM properties
  WHERE status = 'available'
    AND (
      6371 * acos(
        cos(radians(lat)) * cos(radians(latitude)) *
        cos(radians(longitude) - radians(lng)) +
        sin(radians(lat)) * sin(radians(latitude))
      )
    ) <= radius_km
  ORDER BY (
    6371 * acos(
      cos(radians(lat)) * cos(radians(latitude)) *
      cos(radians(longitude) - radians(lng)) +
      sin(radians(lat)) * sin(radians(latitude))
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to calculate commission
CREATE OR REPLACE FUNCTION calculate_commission(
  sale_price DECIMAL,
  commission_percentage DECIMAL DEFAULT 5.0,
  platform_fee_percentage DECIMAL DEFAULT 1.0
)
RETURNS TABLE (
  commission_amount DECIMAL,
  platform_fee_amount DECIMAL,
  agent_net_amount DECIMAL
) AS $$
BEGIN
  commission_amount := sale_price * (commission_percentage / 100);
  platform_fee_amount := commission_amount * (platform_fee_percentage / 100);
  agent_net_amount := commission_amount - platform_fee_amount;
  
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- Function to get property statistics
CREATE OR REPLACE FUNCTION get_property_statistics(property_uuid UUID)
RETURNS TABLE (
  total_visits BIGINT,
  scheduled_visits BIGINT,
  completed_visits BIGINT,
  days_on_market INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_visits,
    COUNT(*) FILTER (WHERE status = 'scheduled')::BIGINT as scheduled_visits,
    COUNT(*) FILTER (WHERE status = 'completed')::BIGINT as completed_visits,
    EXTRACT(DAY FROM NOW() - p.created_at)::INTEGER as days_on_market
  FROM properties p
  LEFT JOIN visits v ON v.property_id = p.id
  WHERE p.id = property_uuid
  GROUP BY p.created_at;
END;
$$ LANGUAGE plpgsql;