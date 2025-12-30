# Final Fix: Supabase Connection

## The Real Issue:
Vercel cannot reach Supabase because of network restrictions OR the connection string needs to be obtained directly from Supabase dashboard.

## Get Connection String from Supabase:

1. **Go to Supabase Dashboard**
2. **Click "Connect" button** (top right, next to project name)
3. **OR** Go to: **Settings → Database → Connection string**
4. **Copy the connection string** shown there
5. **Make sure to:**
   - Select "URI" format (not JDBC or other)
   - If pooler is available, use "Connection pooling" → "Transaction" mode
   - Copy the FULL connection string

## Update Vercel:

1. **Vercel Dashboard → Project → Settings → Environment Variables**
2. **Update DATABASE_URL** with the connection string from Supabase
3. **URL encode the password** if it has special characters:
   - `@` → `%40`
   - Use: https://www.urlencoder.org/
4. **Save** and **Redeploy**

## Critical: Network Restrictions MUST Be Removed

**Supabase Dashboard → Database → Settings → Network Restrictions:**
- Must say: **"Your database can be accessed by all IP addresses"**
- If restricted, you MUST remove restrictions
- This is the #1 cause of "Can't reach database server" errors

## Alternative: Check Supabase Project Status

- Make sure project is **NOT paused**
- Should show **"Active"** status
- If paused, unpause it

