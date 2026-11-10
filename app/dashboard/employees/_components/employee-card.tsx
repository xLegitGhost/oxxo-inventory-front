import { Card, CardHeader, CardBody, CardFooter, Divider, Button } from '@nextui-org/react';
import Link from 'next/link';
import { Employee } from '@/entities';

export default function EmployeeCard({ employee }: { employee: Employee }) {
  const id = employee.id || (employee as any).employeeId;

  return (
    <Card className="size-72 max-h-72 relative">
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
        <h1 className="text-xl font-bold">
          {employee.employeeName} {employee.employeeLastName}
        </h1>
      </CardHeader>
      <Divider />
      <CardBody className="px-4 py-2 flex flex-col gap-2">
        <p>
          <b>Correo:</b> {employee.employeeEmail}
        </p>
        <p>
          <b>Número de teléfono:</b> {employee.employeePhoneNumber}
        </p>
      </CardBody>
      <CardFooter className="absolute bottom-0 h-14 py-2 w-full flex justify-end">
        <Link href={`/dashboard/employees/${id}`}>
          <Button variant="ghost">Actualizar datos</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
