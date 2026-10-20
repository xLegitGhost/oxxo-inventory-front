import Header from './_components/header';
import Sidebar from './_components/sidebar';
import { cookies } from 'next/headers';
import { TOKEN_NAME } from '@/constants';

export default function LayoutDashboard({
  children,
  count,
}: {
  children: React.ReactNode;
  count: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;

  return (
    <div className="bg-orange-200">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <div className="flex flex-col p-4 w-full h-[90vh] overflow-y-auto">
          {children}
          {count}
        </div>
      </div>
    </div>
  );
}
