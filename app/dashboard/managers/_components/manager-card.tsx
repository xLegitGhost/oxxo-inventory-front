import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';
import { Manager } from '@/entities';
import LocationMap from '@/app/dashboard/@locations/_components/location-map';
import GenericModal from '@/components/modal';
import FormCreateUserManager from './form-create-user';
import FormUpdateUserManager from './form-update-user';

export default function ManagerCard({ manager }: { manager: Manager }) {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold">
          {manager.managerFullName}
        </h1>
        {manager.user ? (
          <GenericModal
            icon={<LuPlus size={20} />}
            color="primary"
            title="Actualizar usuario"
          >
            <FormUpdateUserManager user={manager.user} />
          </GenericModal>
        ) : (
          <GenericModal
            icon={<LuPlus size={20} />}
            color="primary"
            title="Crear usuario"
          >
            <FormCreateUserManager manager={manager} />
          </GenericModal>
        )}
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-4 text-base p-6">
        <div className="flex flex-col gap-2">
          <p>
            <b>Email:</b> {manager.managerEmail}
          </p>
          <p>
            <b>Teléfono:</b> {manager.managerPhoneNumber}
          </p>
          <p>
            <b>Salario:</b> ${manager.managerSalary?.toLocaleString()}
          </p>
          {manager.user && (
            <p className="text-sm text-green-700 bg-green-100 px-3 py-1.5 rounded-md font-medium inline-block w-fit">
              <b>Usuario vinculado:</b> {manager.user.userEmail}
            </p>
          )}
        </div>
        <Divider />
        <div className="flex flex-col gap-3">
          <p className="text-lg font-bold">Tienda asignada:</p>
          {manager.location ? (
            <div className="flex flex-col gap-2">
              <Link
                href={`/dashboard?store=${manager.location.locationId}`}
                className="text-orange-600 underline font-semibold text-lg hover:text-orange-800"
              >
                {manager.location.locationName} ({manager.location.locationAddress})
              </Link>
              {manager.location.locationLatLng && (
                <LocationMap
                  lat={manager.location.locationLatLng[0]}
                  lng={manager.location.locationLatLng[1]}
                  locationName={manager.location.locationName}
                  address={manager.location.locationAddress}
                />
              )}
            </div>
          ) : (
            <p className="text-3xl font-bold text-red-500 text-center py-4">
              No tiene tienda
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
