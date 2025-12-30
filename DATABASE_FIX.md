# Database Connection Fix

## Issue: Can't reach database server

This error usually means:
1. **Connection pooler needed** - Supabase requires connection pooler for serverless (Vercel)
2. **IP restrictions** - Supabase might have IP allowlist enabled
3. **Wrong connection string format**

## Solution 1: Use Connection Pooler (Recommended for Vercel)

Supabase provides two connection strings:
- **Direct connection** (port 5432) - for local/dev
- **Connection pooler** (port 6543) - for serverless/production

### Get Connection Pooler URL from Supabase:
1. Go to Supabase Dashboard → Your Project → Settings → Database
2. Under "Connection string" → Select "Connection pooling" → "Transaction" mode
3. Copy the connection string
4. It should look like: `postgresql://postgres.xxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres`

### Update Vercel Environment Variable:
- Name: `DATABASE_URL`
- Value: Use the **connection pooler URL** (port 6543)
- Make sure password is URL-encoded if it has special characters

## Solution 2: Check Supabase Settings

1. **Disable IP restrictions:**
   - Supabase Dashboard → Settings → Database
   - Make sure "Connection pooling" is enabled
   - Check if there are IP allowlists that might block Vercel

2. **Enable connection pooling:**
   - Go to Settings → Database → Connection Pooling
   - Enable "Transaction" mode pooling

## Solution 3: Test Connection Locally

```bash
# Set DATABASE_URL
export DATABASE_URL="postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require"

# Test connection
npx prisma db pull

# If that works, try the pooler URL
export DATABASE_URL="postgresql://postgres.xxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
npx prisma db pull
```

## Solution 4: Alternative - Use Supabase REST API

If database connection continues to fail, we can switch to Supabase REST API instead of direct Prisma connection.

