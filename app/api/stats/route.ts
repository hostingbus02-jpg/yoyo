import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const updates = await prisma.update.count();
  const users = await prisma.user.count();
  const last = await prisma.update.findFirst({
    orderBy: { created_at: "desc" },
    select: { created_at: true }
  });

  return NextResponse.json({
    updates,
    users,
    lastUpdate: last?.created_at || null
  });
}



