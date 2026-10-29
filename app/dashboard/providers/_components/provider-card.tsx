import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Provider } from '@/entities';

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card className="w-[300px] min-h-[160px] bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="font-bold text-xl text-neutral-800">
        {provider.providerName}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2 text-sm text-neutral-700">
        <p>
          <b>Correo:</b> {provider.providerEmail}
        </p>
        <p>
          <b>Teléfono:</b> {provider.providerPhoneNumber}
        </p>
        <p>
          <b>Productos:</b>{' '}
          {provider.products && provider.products.length > 0
            ? `Tiene ${provider.products.length} producto${provider.products.length > 1 ? 's' : ''}`
            : 'No tiene productos'}
        </p>
      </CardBody>
    </Card>
  );
}
