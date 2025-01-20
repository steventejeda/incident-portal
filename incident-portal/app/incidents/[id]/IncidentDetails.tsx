import  IncidentStatusBadge from '@/app/components/IncidentStatusBadge';
import { Incident } from '@prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

const IncidentDetails = ({ incident }: { incident: Incident }) => {
  return (
    <>
      <Heading>{incident.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IncidentStatusBadge status={incident.status} />
        <Text>{incident.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{incident.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IncidentDetails;