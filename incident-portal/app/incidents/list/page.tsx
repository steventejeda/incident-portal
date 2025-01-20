import Pagination from '@/app/components/Pagination';
import { STATUS } from '@prisma/client';
import IncidentActions from './IncidentActions';
import IncidentTable, { IncidentQuery, columnNames } from './IncidentTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Props {
  searchParams: Promise<IncidentQuery>;  
}

const IncidentsPage = async ({ searchParams }: Props) => {
  const resolvedSearchParams = await searchParams;
  const { status, orderBy: orderByQuery, page } = resolvedSearchParams;

  const statuses = Object.values(STATUS);
  const filteredStatus = statuses.includes(status) ? status : undefined;

  const where = { status: filteredStatus };

  const orderBy = columnNames.includes(orderByQuery)
    ? { [orderByQuery]: 'asc' }
    : undefined;

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;
  
  const incidents = await prisma.incident.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const incidentCount = await prisma.incident.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IncidentActions />
      <IncidentTable searchParams={resolvedSearchParams} incidents={incidents} />
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        itemCount={incidentCount}
      />
    </Flex>
  );
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Incident Portal - Incident List',
  description: 'View all incidents',
};

export default IncidentsPage;
