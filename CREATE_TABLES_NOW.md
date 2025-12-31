# ⚠️ URGENT: Create Database Tables in Supabase

## The Real Issue:
Your database tables probably don't exist! That's why Prisma can't connect.

## Create Tables in Supabase:

### Method 1: SQL Editor (Easiest)

1. **Go to Supabase Dashboard**
2. **Click "SQL Editor"** (left sidebar)
3. **Click "New query"**
4. **Paste this SQL:**

```sql
-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create Update table
CREATE TABLE IF NOT EXISTS "updates" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. **Click "Run"** (or press Cmd/Ctrl + Enter)
6. **Verify:** Go to Database → Tables, you should see both tables

### Method 2: Table Editor

1. **Supabase Dashboard → Database → Tables**
2. **Click "New table"**
3. **Create "User" table:**
   - id: uuid, Primary Key, Default: gen_random_uuid()
   - email: text, Unique, Not null
   - password: text, Not null
   - created_at: timestamp, Default: now()
4. **Create "updates" table:**
   - id: uuid, Primary Key, Default: gen_random_uuid()
   - title: text, Not null
   - content: text, Not null
   - created_at: timestamp, Default: now()

## After Creating Tables:

1. **Wait 30 seconds**
2. **Try registration again** at `/register`
3. **Should work now!**

## If Still Doesn't Work:

The connection string might need to be obtained directly from Supabase:
1. **Supabase Dashboard → Click "Connect" button**
2. **Copy the connection string shown**
3. **Update Vercel DATABASE_URL** with that exact string
4. **Redeploy**

