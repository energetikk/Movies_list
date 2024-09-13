'use client';

// import { signOut } from "@/configs/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
// import { Button } from "./ui/button";
type NavLink = {
    label: string;
    href: string;
};
type Props = {
    navLinks: NavLink[];
};

const navLinks = [
    { label: "Главная", href: "/" },
    { label: "Фильмы", href: "/films" },
    { label: "Избраное", href: "/favorite" },
    { label: "Профиль", href: "/profile" },
];

// const ButtonSignOut = () => {


//     return (
//         <Link href="#" onClick={() => signOut({ callbackUrl: "/signin" })}>Выйти</Link>
// )
// }

// export default ButtonSignOut;


const ButtonSignOut = () => {
    const pathname = usePathname();

    return (
        <>
            {navLinks && navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className={isActive ? "active" : ""}
                    >
                        {link.label}
                    </Link>
                );
            })}
            <Link href="#" onClick={() => signOut({ callbackUrl: "/signin" })}>Выйти</Link>
        </>

    )
}

export default ButtonSignOut;