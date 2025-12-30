# How to Build Your Connection String with Your Password

## Your Supabase Details:
- **Host:** `db.pqzmzuomafhqhppmybmt.supabase.co`
- **Port:** `5432` (direct) or `6543` (pooler)
- **Database:** `postgres`
- **Username:** `postgres`
- **Your Password:** (enter your actual password below)

## Step 1: URL Encode Your Password

If your password has special characters, you need to URL-encode them:

**Common special characters:**
- `@` becomes `%40`
- `[` becomes `%5B`
- `]` becomes `%5D`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `=` becomes `%3D`
- `?` becomes `%3F`
- `/` becomes `%2F`
- ` ` (space) becomes `%20`

## Step 2: Build Your Connection String

### Format:
```
postgresql://postgres:[YOUR_URL_ENCODED_PASSWORD]@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

### Example:
If your password is `MyPass@123`, it becomes:
```
postgresql://postgres:MyPass%40123@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Step 3: Quick URL Encode Tool

You can use this online tool or Python:

**Python (run in terminal):**
```bash
python3 -c "import urllib.parse; print(urllib.parse.quote('YOUR_PASSWORD_HERE', safe=''))"
```

**Or use online:** https://www.urlencoder.org/

## Step 4: Set in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Key:** `DATABASE_URL`
   - **Value:** Your complete connection string from Step 2
   - **Environment:** All (Production, Preview, Development)
3. Save and Redeploy

## Alternative: Get Password from Supabase

1. Go to Supabase Dashboard → Database → Settings
2. Look for "Database password" section
3. Click "Reset database password" if needed
4. Copy the password shown
5. Use it in the connection string above

