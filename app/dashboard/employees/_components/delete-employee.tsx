import { Button } from '@nextui-org/react';
import { LuTrash } from 'react-icons/lu';
import { deleteEmployee } from '@/actions/employees/delete';

export default function DeleteEmployee({ employeeId }: { employeeId: string }) {
  const deleteEmployeeWithId = deleteEmployee.bind(null, employeeId);

  return (
    <form action={deleteEmployeeWithId}>
      <Button isIconOnly color="danger" variant="light" type="submit">
        <LuTrash size={20} />
      </Button>
    </form>
  );
}
