import Link from "next/link";

import { useRouter } from "next/router";

interface NavItemProps {
  link: string;
  label: string;
}

export function NavItem(props: NavItemProps) {
  const { label, link } = props;

  const { asPath } = useRouter();

  const isHightLight = asPath !== link;

  return (
    <Link
      href={link}
      className={`${
        isHightLight && "brightness-50"
      } font-bold text-lg hover:brightness-75 duration-200`}
    >
      {label}
    </Link>
  );
}
