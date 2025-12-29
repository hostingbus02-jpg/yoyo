import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const updates = await prisma.update.count();
  const users = await prisma.user.count();
  const last = await prisma.update.findFirst({
    orderBy: { createdAt: "desc" },
    select: { createdAt: true }
  });

  return NextResponse.json({
    updates,
    users,
    lastUpdate: last?.createdAt || null
  });
}



