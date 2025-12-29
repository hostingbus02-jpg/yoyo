import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 });

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // Create session
  const response = NextResponse.json({ success: true });
  response.cookies.set("auth", user.id.toString(), { 
    httpOnly: true, 
    path: "/", 
    maxAge: 86400 
  });

  return response;
}



