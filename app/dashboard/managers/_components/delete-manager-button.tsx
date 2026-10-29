import { Button } from '@nextui-org/react';
import { LuTrash } from 'react-icons/lu';
import { deleteManager } from '@/actions/managers/delete';

export default function DeleteManagerButton({ managerId }: { managerId: string }) {
  const deleteManagerWithId = deleteManager.bind(null, managerId);

  return (
    <form action={deleteManagerWithId}>
      <Button
        type="submit"
        color="danger"
        startContent={<LuTrash size={20} />}
      >
        Borrar
      </Button>
    </form>
  );
}
