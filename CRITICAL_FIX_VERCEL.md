# ⚠️ CRITICAL: DATABASE_URL Value is Wrong!

## The Problem:
Your DATABASE_URL in Vercel includes the variable name itself:
```
DATABASE_URL="postgresql://..."
```

This is **WRONG**! The value should ONLY be the connection string, not the variable name.

## Fix in Vercel:

1. **Go to:** Vercel Dashboard → Your Project → Settings → Environment Variables
2. **Find:** `DATABASE_URL`
3. **Click to edit**
4. **In the VALUE field, enter ONLY this** (no variable name, no quotes):
   ```
   postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
   ```
5. **Make sure:**
   - ✅ Key/Name field says: `DATABASE_URL`
   - ✅ Value field contains ONLY: `postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require`
   - ✅ NO quotes around the value
   - ✅ NO "DATABASE_URL=" prefix
   - ✅ Port is 5432 (not 6543)
6. **Save**
7. **Redeploy**

## What It Should Look Like in Vercel:

**Key/Name:** `DATABASE_URL`  
**Value:** `postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require`

**NOT:**
- ❌ `DATABASE_URL="postgresql://..."`
- ❌ `"postgresql://..."`
- ❌ `DATABASE_URL=postgresql://...`

## After Fixing:

1. Wait for redeploy (1-2 minutes)
2. Visit: `https://yoyo-liart.vercel.app/api/test-db`
3. Should show: `fullUrl` starting with `postgresql://` (not `DATABASE_URL=`)
4. Try registration - should work now!

