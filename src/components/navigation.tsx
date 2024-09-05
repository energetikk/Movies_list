"use client";
import Link from "next/link";
import { auth } from "@/configs/auth";
import { useSession, signOut, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();

  console.log(session);
  const isLoggedIn = session?.data;

return (
  <>
    {navLinks && navLinks.map((link) => {
      const isActive = pathname === link.href;

      return (
        isLoggedIn && <Link
          key={link.label}
          href={link.href}
          className={isActive ? "active" : ""}
        >
          {link.label}
        </Link>
      );
    })}
    
    {isLoggedIn ? (
      <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
        Выйти
      </Link>
    ) : (
      // <Link href="/api/auth/signin">Войти</Link>
      <Link href="/signin">Войти</Link>
      
    )}
  </>
);
};

export { Navigation };