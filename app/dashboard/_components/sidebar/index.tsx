import { LuStore, LuTruck, LuUser, LuWheat, LuUsers } from 'react-icons/lu';
import NavItem from './item';

export default function Sidebar() {
  return (
    <div className="w-[10vw] h-[90vh] bg-orange-200 flex flex-col items-center gap-10 py-4">
      <NavItem icon={<LuStore className="text-4xl" />} path="/dashboard" />
      <NavItem icon={<LuTruck className="text-4xl" />} path="/dashboard/providers" />
      <NavItem icon={<LuUser className="text-4xl" />} path="/dashboard/managers" />
      <NavItem icon={<LuWheat className="text-4xl" />} path="/dashboard/products" />
      <NavItem icon={<LuUsers className="text-4xl" />} path="/dashboard/employees" />
    </div>
  );
}
