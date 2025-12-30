# Supabase Connection String Guide

## Your Project Details:
- **Project ID:** `pqzmzuomafhqhppmybmt`
- **Database Host:** `db.pqzmzuomafhqhppmybmt.supabase.co`
- **Password:** `[Sambyal@022]` (needs URL encoding)

## Connection String Formats:

### Option 1: Direct Connection (Port 5432)
```
postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

### Option 2: Connection Pooler (Port 6543) - RECOMMENDED for Vercel
The pooler URL format is usually:
```
postgresql://postgres.pqzmzuomafhqhppmybmt:%5BSambyal%40022%5D@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**Note:** The pooler hostname might be different. Check in Supabase Dashboard → Database → Connection string → Connection pooling

## How to Get the Exact Connection String:

1. **Click "Database" in left sidebar** (under CONFIGURATION)
2. **Look for "Connection string" section**
3. **For Vercel, use "Connection pooling" → "Transaction" mode**
4. **Copy the full connection string**

## Quick Setup:

If you can't find it, try this connection string in Vercel:

**For Connection Pooler (Best for Vercel):**
```
postgresql://postgres.pqzmzuomafhqhppmybmt:%5BSambyal%40022%5D@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

**For Direct Connection (If pooler doesn't work):**
```
postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Set in Vercel:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `DATABASE_URL` = (one of the connection strings above)
3. Redeploy

