import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check if tables exist
    const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
      SELECT tablename 
      FROM pg_tables 
      WHERE schemaname = 'public'
    `;
    
    const tableNames = tables.map(t => t.tablename);
    
    return NextResponse.json({
      status: "connected",
      database: "accessible",
      tables: tableNames,
      hasUpdatesTable: tableNames.includes("updates"),
      hasUserTable: tableNames.includes("User"),
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Health check error:", error);
    
    return NextResponse.json({
      status: "error",
      error: error.message || "Unknown error",
      code: error.code,
      details: {
        message: error.message,
        code: error.code,
        meta: error.meta
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

