'use client';

import { LuPlus } from 'react-icons/lu';
import { Location } from '@/entities';
import GenericModal from '@/components/modal';
import FormCreateManager from './form-create-manager';

interface CreateManagerProps {
  stores: Location[];
}

export default function CreateManager({ stores }: CreateManagerProps) {
  return (
    <GenericModal
      icon={<LuPlus size={20} className="text-white" />}
      color="primary"
    >
      <FormCreateManager stores={stores} />
    </GenericModal>
  );
}
