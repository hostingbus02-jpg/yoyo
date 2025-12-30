# Quick Setup - Use These Connection Strings

## Your Supabase Project:
- **Project ID:** `pqzmzuomafhqhppmybmt`
- **Password:** `[Sambyal@022]` (URL encoded: `%5BSambyal%40022%5D`)

## Connection Strings (Ready to Use):

### Option 1: Connection Pooler (RECOMMENDED for Vercel)
```
postgresql://postgres.pqzmzuomafhqhppmybmt:%5BSambyal%40022%5D@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### Option 2: Direct Connection (If pooler doesn't work)
```
postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Set in Vercel NOW:

1. **Go to:** https://vercel.com/dashboard
2. **Select your project:** `yoyo` or `beamer-widget`
3. **Go to:** Settings → Environment Variables
4. **Add new variable:**
   - **Key:** `DATABASE_URL`
   - **Value:** Copy one of the connection strings above (try Option 1 first)
   - **Environment:** Select all (Production, Preview, Development)
5. **Click "Save"**
6. **Redeploy** your project

## That's it! The connection string is ready to use above.

