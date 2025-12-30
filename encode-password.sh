#!/bin/bash
# Quick script to URL encode your password for the connection string

echo "Enter your Supabase database password:"
read -s PASSWORD

ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$PASSWORD', safe=''))")

echo ""
echo "Your URL-encoded password: $ENCODED"
echo ""
echo "Your complete connection string:"
echo "postgresql://postgres:$ENCODED@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require"
echo ""
echo "Copy the connection string above and use it in Vercel Environment Variables as DATABASE_URL"

