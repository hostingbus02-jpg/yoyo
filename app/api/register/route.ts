import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashed }
    });

    return NextResponse.json({ success: true, message: "User created successfully" });
  } catch (e: any) {
    console.error("REGISTER ERROR:", e);
    console.error("Error code:", e.code);
    console.error("Error message:", e.message);
    console.error("Error meta:", e.meta);
    
    // Provide more specific error messages
    if (e.code === 'P2002') {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    
    // Database connection errors
    if (e.code === 'P1001' || e.code === 'P1000' || e.message?.includes("Can't reach database server") || e.message?.includes("connect") || e.message?.includes("timeout") || e.message?.includes("Tenant or user not found")) {
      const errorDetails = {
        code: e.code,
        message: e.message,
        meta: e.meta,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        databaseUrlPreview: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 50) + "..." : "NOT SET"
      };
      console.error("Database connection error details:", errorDetails);
      
      let errorMsg = `Database connection failed: ${e.message || 'Unknown error'}. `;
      if (e.message?.includes("Tenant or user not found")) {
        errorMsg += "Connection pooler format may be wrong. Use direct connection: postgresql://postgres:Sambyal%40022@db.pqzmzuomafhqhppmybmt.supabase.co:5432/postgres?sslmode=require";
      } else if (e.message?.includes("Can't reach database server")) {
        errorMsg += "Verify: 1) DATABASE_URL is set in Vercel, 2) Connection string format is correct, 3) Password is URL-encoded (@ becomes %40)";
      }
      
      return NextResponse.json({ 
        error: errorMsg
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: e.message || "Registration failed. Please try again." 
    }, { status: 500 });
  }
}
