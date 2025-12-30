# Database Connection Troubleshooting

## Current Connection String:
```
postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

## Step-by-Step Fix:

### 1. Verify DATABASE_URL in Vercel
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Check that `DATABASE_URL` exists and has the correct value
- Make sure it's set for **all environments** (Production, Preview, Development)
- **Redeploy** after setting/updating

### 2. Check Supabase Project Status
- Go to Supabase Dashboard → Your Project
- Make sure project is **NOT paused**
- Check if project shows "Active" status

### 3. Check Network Restrictions
- Go to Supabase Dashboard → Database → Settings
- Scroll to "Network Restrictions" section
- **IMPORTANT:** Make sure it says "Your database can be accessed by all IP addresses"
- If there are restrictions, either:
  - Remove them, OR
  - Add Vercel IP ranges (not recommended, better to allow all)

### 4. Verify Database Tables Exist
- Go to Supabase Dashboard → Database → Tables
- Check if `updates` and `User` tables exist
- If they don't exist, you need to create them:
  ```bash
  # Run locally with DATABASE_URL set:
  npx prisma db push
  ```

### 5. Test Connection String Format

Try these alternative formats in Vercel:

**Option A (Current - with URL encoding):**
```
postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

**Option B (Without URL encoding - Vercel might handle it):**
```
postgresql://postgres:Sambyal@022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require
```

**Option C (With connection pooler - if available):**
```
postgresql://postgres.pqzmzuomafhqhppmybmt:Sambyal%40022@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
```

### 6. Check Vercel Deployment Logs
- Go to Vercel Dashboard → Your Project → Deployments
- Click on the latest deployment
- Check "Function Logs" for any database connection errors
- Look for specific error messages that might help diagnose

### 7. Verify Password
- Go to Supabase Dashboard → Database → Settings
- Check "Database password" section
- If unsure, click "Reset database password"
- Update connection string with new password if reset

## Common Issues:

1. **"Can't reach database server"**
   - Project might be paused
   - Network restrictions blocking Vercel
   - Wrong hostname/port

2. **"Authentication failed"**
   - Wrong password
   - Password not URL-encoded correctly
   - Wrong username

3. **"Connection timeout"**
   - Network restrictions
   - Firewall blocking
   - Database not accessible

## Quick Test:

After updating DATABASE_URL in Vercel:
1. **Redeploy** your project
2. Try registering at `/register`
3. Check Vercel function logs for detailed error messages
4. The error message will now show more details about what's wrong

