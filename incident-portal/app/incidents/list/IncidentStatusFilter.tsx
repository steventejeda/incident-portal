'use client';

import { STATUS } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const statuses: { label: string; value?: STATUS }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IncidentStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle filter changes when selecting a status
  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams); 

    if (status) params.set('status', status); 
    if (searchParams.get('orderBy')) {
      params.set('orderBy', searchParams.get('orderBy')!); 
    }

    const query = params.toString() ? '?' + params.toString() : '';
    router.push('/incidents/list' + query); 
  };

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={handleStatusChange}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item
            key={status.value || status.label + index}
            value={status.value || 'ALL'}
          >
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IncidentStatusFilter;
