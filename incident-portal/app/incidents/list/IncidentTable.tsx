import IncidentStatusBadge from '@/app/components/IncidentStatusBadge';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import NextLink from 'next/link';
import { Incident, STATUS } from '@prisma/client';

export interface IncidentQuery {
  status: STATUS;
  orderBy: keyof Incident;
  page: string;
}

interface Props {
  searchParams: IncidentQuery; 
  incidents: Incident[];
}

const IncidentTable = ({ searchParams, incidents }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.className}
            >
              <NextLink
                href={{
                  query: {
                    status: searchParams.status,
                    page: searchParams.page,
                    orderBy: column.value, 
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {incidents.map((incident) => (
          <Table.Row key={incident.id}>
            <Table.Cell>
              <Link href={`/incidents/${incident.id}`}>{incident.title}</Link>
              <div className="block md:hidden">
                <IncidentStatusBadge status={incident.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IncidentStatusBadge status={incident.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {incident.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: {
  label: string;
  value: keyof Incident;
  className?: string;
}[] = [
  { label: 'Incident', value: 'title' },
  {
    label: 'Status',
    value: 'status',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Created',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

export const columnNames = columns.map((column) => column.value);

export default IncidentTable;
