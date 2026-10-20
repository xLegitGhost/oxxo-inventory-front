'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface NavItemProps {
  icon: ReactNode;
  path: string;
}

export default function NavItem({ icon, path }: NavItemProps) {
  const pathname = usePathname();

  return (
    <Link href={path} className="w-full flex justify-center">
      <span
        className={`w-10/12 flex justify-center items-center rounded-md p-2 transition-colors ${
          pathname === path ? 'bg-orange-400' : ''
        }`}
      >
        {icon}
      </span>
    </Link>
  );
}
