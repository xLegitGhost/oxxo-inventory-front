'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { LuPlus } from 'react-icons/lu';
import FormCreateProvider from './form-create-provider';

export default function CreateProvider() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        color="primary"
        className="font-semibold text-white"
        startContent={<LuPlus size={20} />}
      >
        Crear proveedor
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent className="bg-orange-400 text-white">
          {() => (
            <>
              <ModalHeader className="text-2xl font-bold flex gap-2 items-center justify-center">
                <LuPlus size={24} /> Crear proveedor
              </ModalHeader>
              <ModalBody>
                <FormCreateProvider />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
