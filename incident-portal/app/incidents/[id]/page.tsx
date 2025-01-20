import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIncidentButton from './EditIncidentButton';
import IncidentDetails from './IncidentDetails';
import DeleteIncidentButton from './DeleteIncidentButton';
import { cache } from 'react';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


interface Props {
  params: { id: string };
}

const fetchUser = cache((incidentId: number) => prisma.incident.findUnique({ where: { id: incidentId }}));

const IncidentDetailPage = async ({ params }: Props) => {

  const incident = await fetchUser(parseInt(params.id));

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
};

export async function generateMetadata({ params }: Props) {
  const incident = await fetchUser(parseInt(params.id));

  return {
    title: incident?.title,
    description: 'Details of Incident ' + incident?.id
  }
}

export default IncidentDetailPage;