import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "User exists" }, { status: 400 });

    const hashed = await hashPassword(password);

    await prisma.user.create({
      data: { email, password: hashed }
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("REGISTER ERROR:", e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
