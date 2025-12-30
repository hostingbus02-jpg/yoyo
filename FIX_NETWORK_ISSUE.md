# Fix: Can't Reach Database Server

## The Problem:
Vercel cannot reach your Supabase database at `db.pqzmzuomafhqhppmybmt.supabase.co:5432`

## Solution: Remove Network Restrictions in Supabase

### Step 1: Check Network Restrictions
1. Go to **Supabase Dashboard**
2. Click **"Database"** in left sidebar
3. Click **"Settings"** (under CONFIGURATION)
4. Scroll down to **"Network Restrictions"** section

### Step 2: Remove or Allow All IPs
**Option A (Recommended):**
- Make sure it says: **"Your database can be accessed by all IP addresses"**
- If it shows restrictions, click **"Remove restriction"** or **"Allow all"**

**Option B (If restrictions are needed):**
- Click **"Add restriction"**
- Add: `0.0.0.0/0` (allows all IPs)
- Save

### Step 3: Verify Project is Active
- In Supabase Dashboard, check project status
- Should show **"Active"** or green status indicator
- If paused, click to unpause

## Alternative: Try Connection Pooler

If direct connection doesn't work, try the connection pooler URL in Vercel:

1. Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**
2. Update `DATABASE_URL` to:
   ```
   postgresql://postgres.pqzmzuomafhqhppmybmt:Sambyal%40022@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
   ```
3. **Save** and **Redeploy**

## Quick Checklist:
- [ ] Supabase Dashboard → Database → Settings → Network Restrictions = "Allow all IPs"
- [ ] Project status = Active (not paused)
- [ ] DATABASE_URL is set in Vercel Environment Variables
- [ ] Vercel project is redeployed after changes

