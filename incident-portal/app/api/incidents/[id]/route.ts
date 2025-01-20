import { patchIncidentSchema } from "@/app/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  const body = await request.json();
  const validation = patchIncidentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });

  const {title, description } = body;

  const incident = await prisma.incident.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!incident)
    return NextResponse.json(
      { error: "Invalid Incident" },
      { status: 404 }
    );

  const updatedIncident = await prisma.incident.update({
    where: { id: incident.id },
    data: {
      title,
      description
    },
  });

  return NextResponse.json(updatedIncident);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {

  const incident = await prisma.incident.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!incident)
    return NextResponse.json(
      { error: "Invalid incident" },
      { status: 404 }
    );

  await prisma.incident.delete({
    where: { id: incident.id },
  });

  return NextResponse.json({});
}