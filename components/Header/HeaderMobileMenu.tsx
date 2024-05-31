import { menu } from '@/components/Header/HeaderButtons';
import HomeSvg from '@/public/svg/home.svg';
import { routes } from '@/utils/constants';
import Link from 'next/link';
import React from 'react';

const HeaderMobileMenu = () => {
  return (
    <ul className="grid w-full grid-cols-5 items-center">
      <li key={routes.main} className="flex flex-col justify-center">
        <Link href={routes.main}>
          <div className="mx-auto w-fit">
            <HomeSvg className="size-6" />
          </div>
          <span className="block text-center text-xs">На главную</span>
        </Link>
      </li>
      {menu.map(x => (
        <li key={x.text} className="flex flex-col justify-center">
          <Link href={x.href} title={x.text}>
            <div className="mx-auto w-fit">{x.logo}</div>
            <span className="block text-center text-xs">{x.text.substring(0, 9)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default HeaderMobileMenu;
