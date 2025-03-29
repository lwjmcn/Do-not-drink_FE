"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useRouterWrapper } from "./RouterWrapperContext";

interface ExtendedLinkProps extends LinkProps {
  children: React.ReactNode;
  isBack: boolean;
  href: string;
}
const ExtendedLink = ({
  children,
  isBack,
  href,
  ...props
}: ExtendedLinkProps) => {
  const router = useRouter();
  const { setIsBack } = useRouterWrapper();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    setIsBack(isBack);
    router.push(href);
  };

  return (
    <Link onClick={handleTransition} href={href} {...props}>
      {children}
    </Link>
  );
};
export default ExtendedLink;
