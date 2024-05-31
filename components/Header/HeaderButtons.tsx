import Blog from '@/public/svg/blog.svg';
import Favourite from '@/public/svg/favourite.svg';
import Plus from '@/public/svg/plus.svg';
import Profile from '@/public/svg/profile.svg';
import buttonStyles from '@/styles/buttonStyles';
import { routes } from '@/utils/constants';
import Link from 'next/link';
import React, { ReactElement } from 'react';

type MenuProps = {
  href: string;
  variant: 'primary' | 'secondary';
  text: string;
  logo: ReactElement<any, any>;
};

export const menu: MenuProps[] = [
  {
    href: routes.profile,
    variant: 'secondary',
    text: 'Профиль',
    logo: <Profile className="size-6" />,
  },
  {
    href: routes.favourites,
    variant: 'secondary',
    text: 'Избранное',
    logo: <Favourite className="size-6" />,
  },
  {
    href: routes.blog,
    variant: 'secondary',
    text: 'Блог',
    logo: <Blog className="size-6" />,
  },
  {
    href: routes.add,
    variant: 'primary',
    text: 'Добавить объявление',
    logo: <Plus className="size-6" />,
  },
];

interface HeaderButtonsProps {
  className?: string;
  onClick?: () => void;
}

export default function HeaderButtons({ className, onClick }: HeaderButtonsProps) {
  return (
    <ul className={className}>
      {menu.map(({ href, text, variant }) => (
        <li key={href} className="mb-2 lg:mb-0" data-testid={href}>
          <Link href={href} className={buttonStyles({ variant: variant })} onClick={onClick}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
