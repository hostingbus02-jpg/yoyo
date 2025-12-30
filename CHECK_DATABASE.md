# How to Check if Database is Running

## Quick Test - Try These URLs:

1. **Test API endpoint (should work):**
   ```
   https://yoyo-liart.vercel.app/api/updates
   ```
   - If it returns `[]` → API works, but might be empty or connection issue
   - If it returns error → Check the error message

2. **Test database connection (after deployment):**
   ```
   https://yoyo-liart.vercel.app/api/db-test
   ```
   - This will show if database connection works
   - Wait 1-2 minutes after pushing for Vercel to deploy

3. **Test registration (this will show the actual error):**
   - Go to: `https://yoyo-liart.vercel.app/register`
   - Try to register a user
   - The error message will show the exact database error

## Check Vercel Logs:

1. Go to: https://vercel.com/dashboard
2. Click your project
3. Go to "Deployments" tab
4. Click on the latest deployment
5. Click "Function Logs"
6. Look for any database connection errors

## From Supabase Dashboard:

Based on your screenshot:
- ✅ Project Status: Green dot (project is running)
- ✅ Tables: 1 table exists
- ⚠️ Need to verify: Network restrictions

**Check Network Restrictions:**
1. Supabase Dashboard → Database → Settings
2. Scroll to "Network Restrictions"
3. Should say: "Your database can be accessed by all IP addresses"
4. If restricted, remove restrictions or allow all IPs

## Most Likely Issues:

1. **Network Restrictions** - Supabase blocking Vercel IPs
2. **Tables Don't Exist** - Need to create `updates` and `User` tables
3. **Wrong Connection String** - DATABASE_URL not set correctly in Vercel

## Next Steps:

1. **Wait 1-2 minutes** for Vercel to deploy the new endpoints
2. **Try:** `https://yoyo-liart.vercel.app/api/db-test`
3. **Check Vercel logs** for detailed error messages
4. **Check Supabase** network restrictions

