import { Card, CardHeader, CardFooter, Image, Button } from '@nextui-org/react';
import Link from 'next/link';
import { Employee } from '@/entities';

export default function EmployeePhotoCard({ employee }: { employee: Employee }) {
  const id = employee.id || (employee as any).employeeId;

  return (
    <Card isFooterBlurred className="size-72 max-h-72 relative">
      <CardHeader className="absolute top-0 z-10 bg-black/25 text-white drop-shadow-sm flex flex-col items-start">
        <h1 className="text-xl font-bold">
          {employee.employeeName} {employee.employeeLastName}
        </h1>
      </CardHeader>
      <Image
        removeWrapper
        alt={`${employee.employeeName} ${employee.employeeLastName}`}
        className="z-0 w-full h-full object-cover size-72"
        src={employee.employeePhoto}
      />
      <CardFooter className="absolute bottom-0 h-14 py-2 z-10 w-full flex justify-end">
        <Link href={`/dashboard/employees/${id}`}>
          <Button variant="ghost">Actualizar datos</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
