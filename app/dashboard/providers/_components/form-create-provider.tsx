import { Input, Button } from '@nextui-org/react';
import { createProvider } from '@/actions/providers/create';

export default function FormCreateProvider() {
  return (
    <form action={createProvider} className="flex flex-col gap-4 pb-4">
      <Input
        label="Nombre del proveedor"
        placeholder="Coca-Cola FEMSA"
        name="providerName"
        isRequired
      />
      <Input
        label="Correo electrónico"
        type="email"
        placeholder="contacto@coca-cola.com"
        name="providerEmail"
        isRequired
      />
      <Input
        label="Número de teléfono"
        placeholder="5512345678"
        name="providerPhoneNumber"
        isRequired
      />
      <Button
        type="submit"
        color="primary"
        className="font-semibold text-white mt-2"
      >
        Crear
      </Button>
    </form>
  );
}
