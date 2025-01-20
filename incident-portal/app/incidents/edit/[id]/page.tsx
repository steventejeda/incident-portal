import React from 'react'

import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic';
import IncidentFormSkeleton from './loading';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const IncidentForm = dynamic(
  () => import('@/app/incidents/components/IncidentForm'),
  { 
    loading: () => <IncidentFormSkeleton />
  }
)

interface Props {
  params: { id: string }
}

const EditIncidentPage = async ({ params }: Props) => {
  const incident = await prisma.incident.findUnique({
    where: { id: parseInt(params.id)}
  });

  if (!incident) notFound();

  return (
    <IncidentForm incident={incident} />
  )
}

export default EditIncidentPage