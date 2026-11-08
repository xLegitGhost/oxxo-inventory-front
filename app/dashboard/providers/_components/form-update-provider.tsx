import { Input, Button } from '@nextui-org/react';
import { Provider } from '@/entities';
import { updateProvider } from '@/actions/providers/update';

export default function FormUpdateProvider({ provider }: { provider: Provider }) {
  const updateProviderWithId = updateProvider.bind(null, provider.providerId);

  return (
    <form
      action={updateProviderWithId}
      className="flex flex-wrap gap-4 items-center bg-orange-200 p-4 rounded-md shadow-sm w-fit"
    >
      <Input
        label="Nombre del proveedor"
        name="providerName"
        placeholder="Nombre"
        defaultValue={provider.providerName}
        isRequired
        className="max-w-[250px]"
      />
      <Input
        label="Correo electrónico"
        type="email"
        name="providerEmail"
        placeholder="Correo"
        defaultValue={provider.providerEmail}
        isRequired
        className="max-w-[250px]"
      />
      <Input
        label="Número de teléfono"
        name="providerPhoneNumber"
        placeholder="Teléfono"
        defaultValue={provider.providerPhoneNumber}
        isRequired
        className="max-w-[250px]"
      />
      <Button type="submit" color="primary" className="font-semibold text-white">
        Actualizar datos
      </Button>
    </form>
  );
}
