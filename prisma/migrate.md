# Database Migration Instructions

## For Local Development:
1. Make sure `.env.production` or `.env` has the DATABASE_URL
2. Run: `npx prisma migrate deploy`
3. Or: `npx prisma db push` (for development)

## For Vercel Production:

### Option 1: Run migrations via Vercel (Recommended)
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `DATABASE_URL` with your Supabase connection string
3. In Vercel Dashboard → Deployments → Click on a deployment → View Function Logs
4. The build process should run `prisma generate` automatically

### Option 2: Run migrations manually
1. Install Prisma CLI: `npm install -g prisma`
2. Set DATABASE_URL: `export DATABASE_URL="your-supabase-url"`
3. Run: `npx prisma migrate deploy`

### Option 3: Use Prisma Studio (Easiest for initial setup)
1. Run: `npx prisma studio`
2. This opens a GUI where you can see and manage your database
3. Tables will be created automatically when you first access them

## Quick Setup Script:
```bash
# Set your database URL
export DATABASE_URL="postgresql://postgres:[Sambyal@022]@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres"

# Push schema to database (creates tables if they don't exist)
npx prisma db push

# Or use migrations
npx prisma migrate deploy
```

