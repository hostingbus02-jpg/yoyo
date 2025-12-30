# Connection Strings to Try

## Current Issue: Can't reach database server

This usually means **Network Restrictions** in Supabase are blocking Vercel.

## Fix Network Restrictions First:
1. Supabase Dashboard → Database → Settings
2. Network Restrictions section
3. Make sure it allows **all IP addresses** (0.0.0.0/0)

## Then Try These Connection Strings in Vercel:

### Option 1: Direct Connection (Current - Port 5432)
```
postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

### Option 2: Connection Pooler (Port 6543) - Try This!
```
postgresql://postgres.pqzmzuomafhqhppmybmt:Sambyal%40022@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### Option 3: Without URL Encoding (Vercel might handle it)
```
postgresql://postgres:Sambyal@022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Steps:
1. **FIRST:** Fix network restrictions in Supabase (allow all IPs)
2. **THEN:** Try Option 2 (connection pooler) in Vercel
3. **Save** and **Redeploy** in Vercel
4. Test registration again

