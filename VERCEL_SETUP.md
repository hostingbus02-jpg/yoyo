# Vercel Environment Variables Setup

## Required Environment Variable

Add this to your Vercel project:

1. Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**
2. Add the following:

**Variable Name:** `DATABASE_URL`  
**Value:** `postgresql://postgres:%5BSambyal%40022%5D@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require`  
**Environment:** Select all (Production, Preview, Development)

## Important Notes:

- The password is URL-encoded: `[Sambyal@022]` becomes `%5BSambyal%40022%5D`
- `?sslmode=require` is added for Supabase SSL connection
- After adding, **redeploy** your project for changes to take effect

## Verify Connection:

After setting the environment variable and redeploying, check:
1. Vercel deployment logs for any database connection errors
2. Try registering a user at `/register`
3. Check Supabase dashboard to see if tables are created

## Database Tables:

Make sure your Supabase database has the tables created. You can:
- Run `npx prisma db push` locally (with DATABASE_URL set)
- Or use Prisma Studio: `npx prisma studio`
- Or create tables manually in Supabase SQL editor

