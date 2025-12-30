# ⚠️ CRITICAL: Can't Reach Database Server

## Most Likely Cause: Supabase Project is PAUSED

### Check Project Status:
1. **Go to Supabase Dashboard**
2. **Look at your project** - check the status indicator
3. **If it shows "Paused"** → Click to **UNPAUSE** it
4. **Wait 1-2 minutes** for database to start

## If Project is Active, Try These:

### Option 1: Get Connection String from Supabase "Connect" Button
1. **Supabase Dashboard → Click "Connect" button** (top right)
2. **Select "URI" format**
3. **Copy the EXACT connection string shown**
4. **Update Vercel DATABASE_URL** with that exact string
5. **Redeploy**

### Option 2: Try Connection Pooler
1. **Supabase Dashboard → Click "Connect"**
2. **Select "Connection pooling" → "Transaction" mode**
3. **Copy that connection string** (will have port 6543)
4. **Update Vercel DATABASE_URL**
5. **Redeploy**

### Option 3: Verify Connection String in Vercel
1. **Vercel Dashboard → Project → Settings → Environment Variables**
2. **Check DATABASE_URL value** - should be EXACTLY:
   ```
   postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
   ```
3. **No extra spaces, no quotes, exact format**
4. **Save and Redeploy**

## Quick Test:
After unpausing/updating, wait 2 minutes, then try:
- Register at: `/register`
- Check Vercel logs for new error messages

