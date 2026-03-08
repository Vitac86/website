'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavLink = {
  href: string;
  label: string;
};

type HeaderNavLinksProps = {
  links: NavLink[];
  linkClassName: string;
  activeClassName: string;
};

export function HeaderNavLinks({ links, linkClassName, activeClassName }: HeaderNavLinksProps): JSX.Element {
  const pathname = usePathname();

  return (
    <>
      {links.map((item) => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={isActive ? 'page' : undefined} className={`${linkClassName} ${isActive ? activeClassName : ''}`.trim()}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </>
  );
}
