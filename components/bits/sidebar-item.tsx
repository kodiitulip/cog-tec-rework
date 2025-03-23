'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  label?: string;
  iconSrc?: string;
  href?: string;
};

export const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant={active ? 'sidebar' : 'sidebarGhost'}
      className='justify-start h-13'
      asChild
    >
      <Link href={href ?? '/learn'}>
        {iconSrc && (
          <Image
            src={iconSrc}
            alt={label ?? ''}
            width={32}
            height={32}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.hidden = true;
            }}
          />
        )}
        {label ?? 'item'}
      </Link>
    </Button>
  );
};
