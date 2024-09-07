import { auth, signOut } from "@/configs/auth";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import ButtonsignOut from './Buttonsign';


const NavBar = async () => {
   
    const session = await auth();

    return (
        <nav className="border-2 flex justify-end border-red-500">
            {session?.user ? 
            (
                <ButtonsignOut />)
                // <Button onClick={() => signOut({})}>Выйти</Button>)
                : 
                (<Link href='/signin'>Войти</Link>)
               }
        </nav>
    );
};

export { NavBar };

