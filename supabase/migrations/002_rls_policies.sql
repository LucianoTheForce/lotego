-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Users can view all profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

-- Users can update own profile
CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Automatic profile creation on signup
CREATE POLICY "Enable insert for authentication users only" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Properties policies
-- Anyone can view available properties
CREATE POLICY "Anyone can view available properties" 
  ON properties FOR SELECT 
  USING (status = 'available' OR owner_id = auth.uid());

-- Authenticated users can create properties
CREATE POLICY "Authenticated users can create properties" 
  ON properties FOR INSERT 
  WITH CHECK (auth.uid() = owner_id);

-- Owners can update their properties
CREATE POLICY "Owners can update their properties" 
  ON properties FOR UPDATE 
  USING (auth.uid() = owner_id);

-- Owners can delete their properties
CREATE POLICY "Owners can delete their properties" 
  ON properties FOR DELETE 
  USING (auth.uid() = owner_id);

-- Visits policies
-- Users can view their own visits
CREATE POLICY "Users can view their own visits" 
  ON visits FOR SELECT 
  USING (visitor_id = auth.uid() OR agent_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM properties WHERE properties.id = visits.property_id AND properties.owner_id = auth.uid()));

-- Authenticated users can create visits
CREATE POLICY "Authenticated users can create visits" 
  ON visits FOR INSERT 
  WITH CHECK (auth.uid() = visitor_id);

-- Users can update their own visits
CREATE POLICY "Users can update their own visits" 
  ON visits FOR UPDATE 
  USING (visitor_id = auth.uid() OR agent_id = auth.uid());

-- Commissions policies
-- Only agents and admins can view commissions
CREATE POLICY "Agents can view their commissions" 
  ON commissions FOR SELECT 
  USING (agent_id = auth.uid() OR 
         EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Only admins can create commissions
CREATE POLICY "Only admins can create commissions" 
  ON commissions FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- Only admins can update commissions
CREATE POLICY "Only admins can update commissions" 
  ON commissions FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));