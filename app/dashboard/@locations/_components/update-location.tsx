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

interface UpdateLocationProps {
  children: React.ReactNode;
  store?: string | string[] | undefined;
}

export default function UpdateLocation({ children, store }: UpdateLocationProps) {
  if (!store || store === '0') return null;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="font-semibold text-white my-4"
        startContent={<LuPencil size={20} />}
      >
        Actualizar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent className="bg-orange-400 text-white">
          {() => (
            <>
              <ModalHeader className="text-2xl font-bold flex gap-2 items-center">
                <LuPencil size={24} /> Actualizar tienda
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
