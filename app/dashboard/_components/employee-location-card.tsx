import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import { Employee } from '@/entities';

export default function EmployeeLocationCard({ employee }: { employee: Employee }) {
  const fullName = `${employee.employeeName} ${employee.employeeLastName}`;

  return (
    <Card className="w-full">
      <CardHeader>
        <p className="w-full">
          Nombre: <b>{fullName}</b>
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="w-full">
          Email: <b>{employee.employeeEmail}</b>
        </p>
        <p className="w-full">
          Teléfono: <b>{employee.employeePhoneNumber}</b>
        </p>
      </CardBody>
    </Card>
  );
}
