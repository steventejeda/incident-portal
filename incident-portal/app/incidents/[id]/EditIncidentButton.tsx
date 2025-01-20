import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const EditIncidentButton = ({ incidentId }: { incidentId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/incidents/edit/${incidentId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIncidentButton;