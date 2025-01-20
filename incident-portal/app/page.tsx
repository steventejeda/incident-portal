import IncidentSummary from './IncidentSummary';
import LatestIncidents from './LatestIncidents';
import IncidentChart from './IncidentChart';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function Home() {
  const open = await prisma.incident.count({
    where: { status: 'OPEN' },
  });
  const inProgress = await prisma.incident.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prisma.incident.count({
    where: { status: 'CLOSED' },
  });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IncidentSummary
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
        <IncidentChart
          open={open}
          inProgress={inProgress}
          closed={closed}
        />
      </Flex>
      <LatestIncidents />
    </Grid>
  );
}

export const dynamic = 'force-dynamic'; 

export const metadata: Metadata = {
  title: 'Incident Portal - Dashboard',
  description: 'View a summary of incidents'
};