import { auth } from "@/configs/auth";
import Link from "next/link";
import ButtonsignOut from './Buttonsign';

const NavBar = async () => {
    const session = await auth();
    return (
        <nav className="flex justify-end gap-2 pr-5 h-12 items-center sm:gap-5">
          {session?.user ? (<ButtonsignOut />) : (<Link href='/signin'>Войти</Link>)}
        </nav>
    );
};

export { NavBar };

