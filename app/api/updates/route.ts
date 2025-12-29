import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// CORS headers for widget embedding
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// GET - Public, no auth required
export async function GET() {
  try {
    const updates = await prisma.update.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json(updates, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching updates:", error);
    return NextResponse.json(
      { error: "Failed to fetch updates" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST - Admin protected
export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    const { title, content } = await req.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const update = await prisma.update.create({
      data: { title, content },
    });
    
    return NextResponse.json(update, { headers: corsHeaders });
  } catch (error) {
    console.error("Error creating update:", error);
    return NextResponse.json(
      { error: "Failed to create update" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { headers: corsHeaders });
}
