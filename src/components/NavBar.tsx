import { auth } from "@/configs/auth";
import Link from "next/link";
import ButtonsignOut from './Buttonsign';

const NavBar = async () => {
    const session = await auth();
    return (
        <nav className="flex justify-end gap-5 pr-5 h-12 items-center">
          {session?.user ? (<ButtonsignOut />) : (<Link href='/signin'>Войти</Link>)}
        </nav>
    );
};

export { NavBar };

