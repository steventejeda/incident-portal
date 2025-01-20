import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { patchIncidentSchema } from "@/app/validationSchemas";
const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  // Ensure the id is a valid number
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
  }

  const body = await request.json();
  const validation = patchIncidentSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { title, description } = body;

  // Find the incident using the parsed ID
  const incident = await prisma.incident.findUnique({
    where: { id: parsedId },
  });

  if (!incident) {
    return NextResponse.json({ error: "Invalid Incident" }, { status: 404 });
  }

  const updatedIncident = await prisma.incident.update({
    where: { id: incident.id },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(updatedIncident);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
  }

  // Ensure the id is a valid number
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return NextResponse.json({ error: "Invalid id parameter" }, { status: 400 });
  }

  const incident = await prisma.incident.findUnique({
    where: { id: parsedId },
  });

  if (!incident) {
    return NextResponse.json({ error: "Invalid incident" }, { status: 404 });
  }

  await prisma.incident.delete({
    where: { id: incident.id },
  });

  return NextResponse.json({});
}
