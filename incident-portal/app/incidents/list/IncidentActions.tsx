import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IncidentStatusFilter from './IncidentStatusFilter';

const IncidentActions = () => {
  return (
    <Flex justify="between">
      <IncidentStatusFilter />
      <Button>
        <Link href="/incidents/new">New Incident</Link>
      </Button>
    </Flex>
  );
};

export default IncidentActions;