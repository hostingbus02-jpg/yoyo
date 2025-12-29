import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const { title, content } = await req.json();

    const updated = await prisma.update.update({
      where: { id: Number(id) },
      data: { title, content }
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PUT Error:", err);
    return NextResponse.json(
      { error: "Failed to update", details: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;

    await prisma.update.delete({ where: { id: Number(id) } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { error: "Failed to delete", details: err.message },
      { status: 500 }
    );
  }
}
