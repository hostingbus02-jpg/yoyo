# Correct Connection Pooler URL Format

## The Error:
"Tenant or user not found" means the connection pooler username format is wrong.

## Correct Format for Supabase Connection Pooler:

The pooler uses a different username format:
- **Username:** `postgres.pqzmzuomafhqhppmybmt` (project ID appended)
- **Host:** `aws-0-us-east-1.pooler.supabase.com` (or similar pooler host)
- **Port:** `6543`

## Correct Connection String:

```
postgresql://postgres.pqzmzuomafhqhppmybmt:Sambyal%40022@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

## Alternative: Use Direct Connection

If pooler doesn't work, go back to direct connection but make sure network restrictions are removed:

```
postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Steps to Fix:

1. **Go to Vercel Dashboard → Your Project → Settings → Environment Variables**
2. **Update DATABASE_URL** with the correct pooler string above
3. **OR** use direct connection if pooler still fails
4. **Save** and **Redeploy**

## Important: Remove Network Restrictions

1. **Supabase Dashboard → Database → Settings**
2. **Network Restrictions** section
3. **Make sure it allows all IPs** (should say "Your database can be accessed by all IP addresses")

