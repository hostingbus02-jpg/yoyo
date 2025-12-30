import { NextResponse } from "next/server";

export async function GET() {
  const info = {
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    databaseUrlLength: process.env.DATABASE_URL?.length || 0,
    databaseUrlStart: process.env.DATABASE_URL?.substring(0, 50) || "NOT SET",
    databaseUrlEnd: process.env.DATABASE_URL?.substring((process.env.DATABASE_URL?.length || 0) - 30) || "NOT SET",
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  };
  
  return NextResponse.json(info);
}

