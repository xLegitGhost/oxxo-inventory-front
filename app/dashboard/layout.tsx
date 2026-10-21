import Header from './_components/header';
import Sidebar from './_components/sidebar';

export default function LayoutDashboard({
  children,
  locations,
}: {
  children: React.ReactNode;
  locations: React.ReactNode;
}) {
  return (
    <div className="bg-orange-200">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-row w-11/12">
          {children}
          {locations}
        </div>
      </div>
    </div>
  );
}
