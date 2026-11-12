'use client';

import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { LuPlus } from 'react-icons/lu';
import { Location } from '@/entities';
import FormCreateEmployee from './form-create-employee';

interface CreateEmployeeProps {
  stores: Location[];
}

export default function CreateEmployee({ stores }: CreateEmployeeProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="fixed bottom-10 right-10 z-50">
        <Button
          isIconOnly
          onPress={onOpen}
          color="primary"
          radius="full"
          className="size-14 shadow-lg text-white"
        >
          <LuPlus className="text-3xl" />
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent className="bg-orange-500 text-white">
          {() => (
            <ModalBody>
              <FormCreateEmployee stores={stores} />
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
