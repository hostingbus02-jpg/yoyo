# Get Connection String from Supabase Dashboard

## Method 1: Connect Button (Easiest)

1. **In Supabase Dashboard**, look at the **top right**
2. **Click the green "Connect" button** (next to project name)
3. A modal/popup will open showing connection strings
4. **Select "URI"** format
5. **Copy the connection string**
6. **Use that EXACT string in Vercel** (just URL-encode the password if needed)

## Method 2: Settings → Database

1. **Supabase Dashboard → Settings** (gear icon)
2. **Click "Database"** tab
3. **Scroll to "Connection string"** section
4. **Select "URI"** (not JDBC or other formats)
5. **Copy the connection string**
6. **If password has special characters, URL-encode:**
   - `@` → `%40`
   - Use: https://www.urlencoder.org/

## Method 3: Project Settings → Database

1. **Left sidebar → "Database"**
2. **Click "Settings"** (under CONFIGURATION)
3. **Look for connection info**

## What to Look For:

The connection string should look like:
```
postgresql://postgres:[PASSWORD]@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres
```

## Update Vercel:

1. **Vercel Dashboard → Project → Settings → Environment Variables**
2. **Update DATABASE_URL** with the connection string from Supabase
3. **Add `?sslmode=require`** at the end if not present
4. **Save** and **Redeploy**

