# Quick Fix: Update Connection String with Your Password

## Option 1: Use Online Tool (Easiest)

1. **Go to:** https://www.urlencoder.org/
2. **Enter your Supabase database password** in the text box
3. **Click "Encode"**
4. **Copy the encoded result**

## Option 2: Use Python (Terminal)

Run this command (replace `YOUR_PASSWORD` with your actual password):
```bash
python3 -c "import urllib.parse; print(urllib.parse.quote('YOUR_PASSWORD', safe=''))"
```

## Build Your Connection String

Once you have your URL-encoded password, use this format:

```
postgresql://postgres:[YOUR_ENCODED_PASSWORD]@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

**Example:**
- If your password is: `MyPass@123`
- URL-encoded: `MyPass%40123`
- Connection string: `postgresql://postgres:MyPass%40123@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require`

## Set in Vercel

1. Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**
2. Find `DATABASE_URL` (or add new if it doesn't exist)
3. Update the value with your new connection string (with correct password)
4. Click **"Save"**
5. **Redeploy** your project

## Get Your Password from Supabase

If you don't know your password:
1. Go to **Supabase Dashboard → Database → Settings**
2. Look for **"Database password"** section
3. Click **"Reset database password"** if needed
4. Copy the password shown
5. Use it in the connection string above

