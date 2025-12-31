# ⚠️ CRITICAL FIX: Connection String Has Quotes!

## Problem Found:
The diagnostic shows your DATABASE_URL in Vercel **includes quotes**:
```
DATABASE_URL="postgresql://..."
```

**This is WRONG!** Environment variables in Vercel should NOT have quotes.

## Fix in Vercel:

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Find:** `DATABASE_URL`
3. **Click to edit it**
4. **Remove the quotes** - the value should be:
   ```
   postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
   ```
   **NOT:**
   ```
   "postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require"
   ```
5. **Save** (no quotes around the value)
6. **Redeploy** your project

## Also Check:
- The diagnostic shows port **6543** (pooler) - if that's not working, switch to port **5432** (direct)
- Make sure the connection string is exactly:
  ```
  postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
  ```
- **NO QUOTES** around it in Vercel

## After Fixing:
1. Wait for redeploy
2. Visit: `https://yoyo-liart.vercel.app/api/test-db` again
3. Should show `hasQuotes: false` and the correct format
4. Try registration again

