import React from 'react';
import ManagerCards from './_components/manager-cards';

export default function LayoutManagers({
  children,
  count,
}: {
  children: React.ReactNode;
  count: React.ReactNode;
}) {
  return (
    <div className="flex flex-row w-full gap-6 p-4">
      <div className="w-4/12">
        <ManagerCards />
      </div>
      <div className="w-8/12 flex flex-col gap-6 items-center">
        {count}
        {children}
      </div>
    </div>
  );
}
