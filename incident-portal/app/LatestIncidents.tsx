import { Card, Flex, Heading, Table } from '@radix-ui/themes';
import React from 'react';
import IncidentStatusBadge from './components/IncidentStatusBadge';
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const LatestIncidents = async () => {
  const incidents = await prisma.incident.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="5">Latest Incidents</Heading>
      <Table.Root>
        <Table.Body>
          {incidents.map((incident) => (
            <Table.Row key={incident.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/incidents/${incident.id}`}>
                      {incident.title}
                    </Link>
                    <IncidentStatusBadge status={incident.status} />
                  </Flex>
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIncidents;