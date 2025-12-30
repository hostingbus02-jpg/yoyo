# Vercel Environment Variable Setup - STEP BY STEP

## ⚠️ IMPORTANT: Use the DIRECT connection string (not pooler)

The pooler URL format might be different. Use the **direct connection** instead.

## Step 1: Get Your Connection String

Based on your Supabase project, use this **DIRECT CONNECTION** string:

```
postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Step 2: Set in Vercel

1. **Go to:** https://vercel.com/dashboard
2. **Click on your project** (yoyo or beamer-widget)
3. **Click:** Settings (top menu)
4. **Click:** Environment Variables (left sidebar)
5. **Click:** "Add New" button
6. **Fill in:**
   - **Key:** `DATABASE_URL`
   - **Value:** `postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require`
   - **Environment:** Check all three boxes:
     - ☑ Production
     - ☑ Preview  
     - ☑ Development
7. **Click:** "Save"
8. **IMPORTANT:** Go to "Deployments" tab → Click "..." on latest deployment → "Redeploy"

## Step 3: Verify

After redeploy, check:
- Vercel deployment logs for any database errors
- Try registering a user at `/register`
- Check if updates can be created at `/admin`

## Troubleshooting

### If still not working:

1. **Check Supabase Database is Running:**
   - Go to Supabase Dashboard → Your Project
   - Make sure project is not paused
   - Check if database is accessible

2. **Try Alternative Connection String Format:**
   ```
   postgresql://postgres:[Sambyal@022]@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
   ```
   (Without URL encoding - Vercel might handle it)

3. **Check Network Restrictions:**
   - Supabase Dashboard → Database → Settings
   - Make sure "Network Restrictions" allows all IPs (or add Vercel IPs)

4. **Verify Tables Exist:**
   - Supabase Dashboard → Database → Tables
   - Make sure `updates` and `User` tables exist
   - If not, run: `npx prisma db push` locally

## Quick Test Connection String:

Try this exact format (copy-paste):
```
postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

