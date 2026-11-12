import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { LuStore } from 'react-icons/lu';
import { Employee } from '@/entities';
import DeleteEmployee from './delete-employee';

export default function EmployeeDataCard({ employee }: { employee: Employee }) {
  const id = employee.id || (employee as any).employeeId;

  return (
    <div className="bg-orange-50 border border-orange-300 rounded-xl p-6 flex flex-col items-center gap-4 w-full max-w-sm shadow-md">
      {employee.employeePhoto ? (
        <div className="overflow-hidden rounded-lg size-60 shadow-sm">
          <Image
            removeWrapper
            src={employee.employeePhoto}
            alt={employee.employeeName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="size-60 bg-orange-200 rounded-lg flex items-center justify-center text-orange-600 font-bold text-4xl shadow-inner">
          {employee.employeeName.charAt(0)}
        </div>
      )}

      <div className="w-full flex justify-between items-center border-b border-orange-200 pb-3">
        <h1 className="text-xl font-bold text-gray-800">
          {employee.employeeName} {employee.employeeLastName}
        </h1>
        <DeleteEmployee employeeId={id} />
      </div>

      <div className="w-full flex flex-col gap-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Correo:</span> {employee.employeeEmail}
        </p>
        <p>
          <span className="font-semibold">Teléfono:</span> {employee.employeePhoneNumber}
        </p>
        {employee.location && (
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-orange-200">
            <LuStore className="text-orange-600 text-lg" />
            <span className="font-semibold">Tienda:</span>
            <Link
              href={`/dashboard?store=${employee.location.locationId}`}
              className="text-orange-600 underline font-medium hover:text-orange-700"
            >
              {employee.location.locationName}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
