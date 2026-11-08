import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Product } from '@/entities';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="max-w-[350px] w-full min-w-[280px] bg-white shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="font-bold text-xl text-neutral-800">
        {product.productName}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2 text-sm text-neutral-700">
        <p>
          <b>Precio:</b> ${product.price?.toFixed(2)}
        </p>
        <p>
          <b>Stock:</b> {product.countSeal}
        </p>
        {product.provider && (
          <p>
            <b>Proveedor:</b> {product.provider.providerName}
          </p>
        )}
      </CardBody>
    </Card>
  );
}
