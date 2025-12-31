import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { hashPassword } from "@/lib/auth";

// Alternative registration using Supabase REST API
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

    // Check if user exists using Supabase
    const { data: existing } = await supabase
      .from('User')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    // Create user using Supabase
    const { data: user, error } = await supabase
      .from('User')
      .insert({ email, password: hashed })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message || "Registration failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "User created successfully", user });
  } catch (e: any) {
    console.error("REGISTER ERROR:", e);
    return NextResponse.json({ 
      error: e.message || "Registration failed. Please try again." 
    }, { status: 500 });
  }
}

