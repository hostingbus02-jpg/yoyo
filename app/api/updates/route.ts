import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CORS headers for widget embedding
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  const updates = await prisma.update.findMany({
    orderBy: { id: "desc" },
  });
  return NextResponse.json(updates, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const update = await prisma.update.create({
    data: { title, content },
  });
  return NextResponse.json(update, { headers: corsHeaders });
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}
