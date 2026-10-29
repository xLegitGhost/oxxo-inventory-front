import { Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import Link from 'next/link';
import { Manager } from '@/entities';
import LocationMap from '@/app/dashboard/@locations/_components/location-map';

export default function ManagerCard({ manager }: { manager: Manager }) {
  return (
    <Card className="w-full">
      <CardHeader className="justify-center">
        <h1 className="text-4xl font-bold text-center">
          {manager.managerFullName}
        </h1>
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
