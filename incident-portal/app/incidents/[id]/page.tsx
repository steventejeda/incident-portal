import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIncidentButton from './EditIncidentButton';
import IncidentDetails from './IncidentDetails';
import DeleteIncidentButton from './DeleteIncidentButton';
import { cache } from 'react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const fetchIncident = cache((incidentId: number) =>
  prisma.incident.findUnique({ where: { id: incidentId } })
);

export default async function IncidentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  try {
    const incident = await fetchIncident(parseInt(id));

    if (!incident) notFound();

    return (
      <Grid columns={{ initial: '1', sm: '5' }} gap="5">
        <Box className="md:col-span-4">
          <IncidentDetails incident={incident} />
        </Box>
        <Box>
          <Flex direction="column" gap="4">
            <EditIncidentButton incidentId={incident.id} />
            <DeleteIncidentButton incidentId={incident.id} />
          </Flex>
        </Box>
      </Grid>
    );
  } catch (error) {
    console.error('Error fetching incident:', error);
    return <div>Error loading incident</div>;
  }
}
