import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const { id } = params;
    const { title, content } = await req.json();

    const updated = await prisma.update.update({
      where: { id: id },
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

    await prisma.update.delete({ where: { id: id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { error: "Failed to delete", details: err.message },
      { status: 500 }
    );
  }
}
