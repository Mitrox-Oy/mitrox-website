-- SQL script to create an admin user in Supabase
-- Run this in Supabase SQL Editor after creating the user via Dashboard

-- Step 1: Create the user (or use Dashboard to create)
-- Then set admin role:

UPDATE auth.users
SET raw_app_meta_data = jsonb_set(
  COALESCE(raw_app_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-email@example.com';

-- Verify the role was set:
SELECT 
  email, 
  raw_app_meta_data->>'role' as role,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'your-email@example.com';

