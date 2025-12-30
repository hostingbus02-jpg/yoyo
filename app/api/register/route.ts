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
    
    // Provide more specific error messages
    if (e.code === 'P2002') {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    
    // Database connection errors
    if (e.code === 'P1001' || e.message?.includes("Can't reach database server")) {
      return NextResponse.json({ 
        error: "Database connection failed. Please check: 1) DATABASE_URL is set in Vercel, 2) Use connection pooler URL (port 6543) for Supabase, 3) Database is accessible." 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      error: e.message || "Registration failed. Please try again." 
    }, { status: 500 });
  }
}
