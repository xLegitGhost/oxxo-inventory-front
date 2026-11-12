import { Image } from '@nextui-org/react';
import Link from 'next/link';
import { LuStore, LuUserCheck, LuUserPlus } from 'react-icons/lu';
import { Employee } from '@/entities';
import DeleteEmployee from './delete-employee';
import GenericModal from '@/components/modal';
import FormCreateUser from './form-create-user';
import FormUpdateUser from './form-update-user';

export default function EmployeeDataCard({ employee }: { employee: Employee }) {
  const id = employee.id || (employee as any).employeeId;

  return (
    <div className="bg-orange-50 border border-orange-300 rounded-xl p-6 flex flex-col items-center gap-4 w-full max-w-sm shadow-md">
      <GenericModal
        activator={
          employee.employeePhoto ? (
            <div className="overflow-hidden rounded-lg size-60 shadow-sm cursor-pointer group relative">
              <Image
                removeWrapper
                src={employee.employeePhoto}
                alt={employee.employeeName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white font-medium text-sm gap-2">
                {employee.user ? (
                  <>
                    <LuUserCheck size={18} /> Editar usuario
                  </>
                ) : (
                  <>
                    <LuUserPlus size={18} /> Crear usuario
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="size-60 bg-orange-200 rounded-lg flex flex-col items-center justify-center text-orange-600 font-bold text-4xl shadow-inner cursor-pointer hover:bg-orange-300 transition-colors">
              <span>{employee.employeeName.charAt(0)}</span>
              <span className="text-xs font-normal mt-2 flex items-center gap-1">
                {employee.user ? (
                  <>
                    <LuUserCheck size={14} /> Editar usuario
                  </>
                ) : (
                  <>
                    <LuUserPlus size={14} /> Crear usuario
                  </>
                )}
              </span>
            </div>
          )
        }
      >
        {employee.user ? (
          <FormUpdateUser user={employee.user} />
        ) : (
          <FormCreateUser employee={employee} />
        )}
      </GenericModal>

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
        {employee.user && (
          <p className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded inline-block font-medium">
            Usuario vinculado: {employee.user.userEmail}
          </p>
        )}
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
