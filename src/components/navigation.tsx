"use client";
import Link from "next/link";
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

//   return (
//     <>
//       {navLinks.map((link) => {
//         const isActive = pathname === link.href;

//         return (
//           {isLoggedIn && <Link
//             key={link.label}
//             href={link.href}
//             className={isActive ? "active" : ""}
//           >
//             {link.label}
//           </Link>}
//         );
//       })}
//       {/* {session?.data && <Link href="/films">Фильмы</Link>}
//       {session?.data && <Link href="/favorite">Избранное</Link>}
//       {session?.data && <Link href="/profile">Профиль</Link>} */}
//       {session?.data ? (
//         <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
//           Выйти
//         </Link>
//       ) : (
//         <Link href="/api/auth/signin">Войти</Link>
//       )}
//     </>
//   );
// };

// export { Navigation };

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
{/*     
    {isLoggedIn && <Link href="/films">Фильмы</Link>}
    {isLoggedIn && <Link href="/favorite">Избранное</Link>}
    {isLoggedIn && <Link href="/profile">Профиль</Link>} */}
    
    {isLoggedIn ? (
      <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
        Выйти
      </Link>
    ) : (
      <Link href="/api/auth/signin">Войти</Link>
    )}
  </>
);
};

export { Navigation };