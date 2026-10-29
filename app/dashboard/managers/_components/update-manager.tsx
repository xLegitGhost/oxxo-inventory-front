'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { LuPencil } from 'react-icons/lu';

interface UpdateManagerProps {
  children: React.ReactNode;
}

export default function UpdateManager({ children }: UpdateManagerProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        startContent={<LuPencil size={20} />}
      >
        Actualizar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent className="bg-orange-400 text-white">
          {() => (
            <>
              <ModalHeader className="text-2xl font-bold flex gap-2 items-center justify-center">
                <LuPencil size={24} /> Actualizar manager
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
