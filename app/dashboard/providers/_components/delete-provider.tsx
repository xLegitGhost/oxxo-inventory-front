'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { LuTrash } from 'react-icons/lu';
import { deleteProvider } from '@/actions/providers/delete';
import { Provider } from '@/entities';

export default function DeleteProvider({ provider }: { provider: Provider }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const deleteProviderWithId = deleteProvider.bind(null, provider.providerId);

  return (
    <>
      <Button
        onPress={onOpen}
        color="danger"
        startContent={<LuTrash size={20} />}
        className="font-semibold"
      >
        Eliminar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-4">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-bold flex flex-col gap-1 text-center">
                ¿Estás seguro de eliminar al proveedor{' '}
                <span className="text-danger">{provider.providerName}</span>?
              </ModalHeader>
              <ModalBody>
                <form action={deleteProviderWithId} className="flex gap-4 justify-center mt-2">
                  <Button type="submit" color="danger" className="font-semibold text-white">
                    Estoy seguro
                  </Button>
                  <Button type="button" variant="light" onPress={onClose}>
                    Cancelar
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
