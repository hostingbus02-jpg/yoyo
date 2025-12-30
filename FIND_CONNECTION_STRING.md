# How to Find Supabase Connection String

## Step-by-Step Instructions:

1. **In Supabase Dashboard** (where you are now):
   - Look at the **left sidebar**
   - Under "CONFIGURATION" section
   - Click on **"Settings"**

2. **In Settings page:**
   - You'll see tabs like "General", "Database", "API", etc.
   - Click on **"Database"** tab

3. **Find Connection String:**
   - Scroll down to "Connection string" section
   - You'll see different connection options:
     - **"URI"** - Direct connection (port 5432)
     - **"Connection pooling"** - For serverless (port 6543) ← **USE THIS ONE**
   
4. **For Vercel (Serverless), use Connection Pooling:**
   - Click on "Connection pooling" dropdown
   - Select **"Transaction"** mode
   - Copy the connection string
   - It will look like: `postgresql://postgres.xxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

5. **Alternative: Direct Connection String:**
   - If pooler isn't available, use "URI" option
   - Copy that string
   - Format: `postgresql://postgres:[PASSWORD]@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres`

## Quick Path:
**Left Sidebar → CONFIGURATION → Settings → Database Tab → Connection string section**

## What I Need:
Once you find it, paste the connection string here and I'll:
- Fix the Prisma schema to match your database (I see you're using UUID, not Int)
- Update all connection strings
- Fix the code to work with UUID instead of Int
- Commit everything

