import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const IncidentFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default IncidentFormSkeleton;