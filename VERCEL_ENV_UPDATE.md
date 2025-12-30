# ⚠️ URGENT: Update DATABASE_URL in Vercel

## The Issue:
Vercel cannot reach Supabase database. This is likely because:
1. Network restrictions blocking direct connection (port 5432)
2. Connection pooler (port 6543) is better for serverless

## Solution: Use Connection Pooler

### Step 1: Update Vercel Environment Variable

1. Go to: **https://vercel.com/dashboard**
2. Click your project: **yoyo** or **beamer-widget**
3. Go to: **Settings** → **Environment Variables**
4. Find: **DATABASE_URL** (or click "Add New")
5. **Update the value to:**
   ```
   postgresql://postgres.pqzmzuomafhqhppmybmt:Sambyal%40022@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
   ```
6. Make sure all environments are selected: ☑ Production ☑ Preview ☑ Development
7. Click **"Save"**

### Step 2: Redeploy

1. Go to **"Deployments"** tab
2. Click **"..."** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

### Step 3: Test

After redeployment, try:
- Register at: `https://yoyo-liart.vercel.app/register`
- Should work now!

## Why Connection Pooler?

- **Port 6543** (pooler) is designed for serverless environments
- **Port 5432** (direct) often blocked by network restrictions
- Pooler handles connection management better for Vercel

## If Pooler Still Doesn't Work:

1. **Check Supabase Network Restrictions:**
   - Supabase Dashboard → Database → Settings
   - Network Restrictions → Should allow all IPs

2. **Verify Project Status:**
   - Make sure project is not paused
   - Should show "Active" status

3. **Try Direct Connection Again:**
   ```
   postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
   ```

