import EmployeesLocation from './_components/employees-location';

export default function DashboardPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="h-full w-8/12">
      <EmployeesLocation store={searchParams?.store} />
    </div>
  );
}
