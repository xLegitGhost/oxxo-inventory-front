'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Image,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';

export interface ModalProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  photo?: string;
  activator?: React.ReactNode;
  title?: string;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
}

export default function GenericModal({
  children,
  icon,
  photo,
  activator,
  title,
  color = 'primary',
  className,
  size = 'lg',
}: ModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {photo ? (
        <div
          onClick={onOpen}
          className="cursor-pointer overflow-hidden rounded-lg size-60 shadow-sm hover:opacity-90 transition-opacity"
        >
          <Image
            removeWrapper
            src={photo}
            alt="Trigger"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : activator ? (
        <div onClick={onOpen} className="inline-block cursor-pointer">
          {activator}
        </div>
      ) : (
        <Button
          isIconOnly
          onPress={onOpen}
          color={color}
          className={className}
        >
          {icon}
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={size}>
        <ModalContent className="p-4">
          {() => (
            <>
              {title && <ModalHeader className="text-xl font-bold">{title}</ModalHeader>}
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export { GenericModal as Modal, GenericModal };
