import HeaderMobileMenu from '@/components/Header/HeaderMobileMenu';
import HeaderTabletMenu from '@/components/Header/HeaderTabletMenu';
import { routes } from '@/utils/constants';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import HeaderButtons, { menu } from './HeaderButtons';
import HomeSvg from '@/public/svg/home.svg';

export default function Header() {
  return (
    <header
      className={clsx(
        'fixed inset-x-0 top-0 z-[9999] h-[52px] bg-gray text-black',
        'standalone:bottom-0 standalone:top-auto standalone:h-[80px]' // for pwa
      )}
    >
      {/*Desktop + Tablet*/}
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between px-3 py-2',
          'hidden md:flex'
        )}
      >
        <Link href={routes.main} className="flex items-center gap-2">
          <span className="text-2xl uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</span>
          <span className="hidden lg:inline">|</span>
          <span className="hidden lg:inline">
            Доска объявлений города {process.env.NEXT_PUBLIC_CITY_NAME}
          </span>
        </Link>
        <HeaderTabletMenu />
        <div className="hidden items-center gap-2 lg:flex">
          <HeaderButtons className="ml-4 flex items-center gap-1" />
        </div>
      </nav>

      {/*Mobile*/}
      <nav
        className={clsx(
          'mx-auto flex w-full max-w-[1100px] justify-between gap-1 px-3 py-2',
          'md:hidden'
        )}
      >
        <HeaderMobileMenu />
      </nav>
    </header>
  );
}
