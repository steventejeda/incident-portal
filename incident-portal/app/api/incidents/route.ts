import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const createIncidentSchema = z.object( { 
    title: z.string().min(1).max(255),
    description: z.string().min(1)
})

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