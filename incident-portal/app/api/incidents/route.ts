import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createIncidentSchema } from "../../validationSchemas";
const prisma = new PrismaClient();


export async function POST(request: NextRequest) { 
    const body = await request.json();
    const validation = createIncidentSchema.safeParse(body);

    if (!validation.success) { 
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const newIncident = await prisma.incident.create({ 
        data: {title: body.title, description: body.description}

    });

    return NextResponse.json(newIncident, { status: 201 })
}