// "use client";
// import Link from "next/link";
// import { useSession, signOut, signIn } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { auth } from "@/configs/auth";

// type NavLink = {
//   label: string;
//   href: string;
// };
// type Props = {
//   navLinks: NavLink[];
// };

// const Navigation = async ({ navLinks }: Props) => {
//   const pathname = usePathname();
//   const session = await auth();
//   // const session = useSession();

//   // console.log(session);
//   // const isLoggedIn = session?.data?.user;
//   // console.log(isLoggedIn);
// return (
//   <>
//     {navLinks && navLinks.map((link) => {
//       const isActive = pathname === link.href;

//       return (
//         session && <Link
//           key={link.label}
//           href={link.href}
//           className={isActive ? "active" : ""}
//         >
//           {link.label}
//         </Link>
//       );
//     })}
    
//     {session ? (
//       <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
//         Выйти
//       </Link>
//     ) : (
//       // <Link href="/api/auth/signin">Войти</Link>
//       <Link href="/signin">Войти</Link>
      
//     )}
//   </>
// );
// };

// export { Navigation };
// "use client";
// import Link from "next/link";
// import { auth } from "@/configs/auth";
// import { useSession, signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";


// const navLinks : Props = [
//   { label: "Главная", href: "/" },
//   { label: "Фильмы", href: "/films" },
//   { label: "Избраное", href: "/favorite" },
//   { label: "Профиль", href: "/profile" },
// ];

// type NavLink = {
//   label: string;
//   href: string;
// };
// type Props = {
//   navLinks: NavLink[];
// };

// const Navigation = () => {
//   const pathname = usePathname();
//   const session = useSession();

//   console.log(session);
//   const isLoggedIn = session?.data;

// return (
//   <>
//     {isLoggedIn && navLinks.map((link) => {
//       const isActive = pathname === link.href;

//       return (
//         isLoggedIn && <Link
//           key={link.label}
//           href={link.href}
//           className={isActive ? "active" : ""}
//         >
//           {link.label}
//         </Link>
//       );
//     })}
    
//     {isLoggedIn ? (
//       <Link href="#" onClick={() => signOut({ callbackUrl: "/" })}>
//         Выйти
//       </Link>
//     ) : (
//       // <Link href="/api/auth/signin">Войти</Link>
//       <Link href="/signin">Войти</Link>
//     )}
//   </>
// );
// };

// export { Navigation };