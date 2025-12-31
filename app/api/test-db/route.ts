import { NextResponse } from "next/server";

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "";
  const hasQuotes = dbUrl.startsWith('"') || dbUrl.startsWith("'");
  const cleanUrl = dbUrl.replace(/^["']|["']$/g, ''); // Remove quotes if present
  
  const info = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlLength: dbUrl.length,
    fullUrl: cleanUrl, // Show full URL without quotes
    hasQuotes: hasQuotes,
    urlStart: cleanUrl.substring(0, 60),
    urlEnd: cleanUrl.substring(cleanUrl.length - 40),
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    recommendation: hasQuotes ? "WARNING: Connection string has quotes - remove them in Vercel!" : "Connection string format looks OK"
  };
  
  return NextResponse.json(info);
}

