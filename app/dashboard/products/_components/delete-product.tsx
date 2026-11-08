import { Button } from '@nextui-org/react';
import { LuTrash } from 'react-icons/lu';
import { deleteProduct } from '@/actions/products/delete';

export default function DeleteProduct({ productId }: { productId: string }) {
  const deleteProductWithId = deleteProduct.bind(null, productId);

  return (
    <form action={deleteProductWithId} className="w-full flex justify-end">
      <Button
        type="submit"
        color="danger"
        className="font-semibold text-white"
        startContent={<LuTrash size={20} />}
      >
        Borrar producto
      </Button>
    </form>
  );
}
