import { auth } from "@/configs/auth";
import Link from "next/link";

export default async function Profile() {
  const session = await auth();
  return (
    <div className="flex flex-col gap-2 bg-red-400">
      <h2>Имя профиля: {session?.user?.name}</h2>
      <h3>Адрес почты: {session?.user?.email}</h3>
      <h3>Срок авторизации: {session?.expires}</h3>
      {session?.user?.image && <img className="h-48 w-48" src={session.user.image} alt="" />}
      <Link href={'/admin'}>Админка</Link>
      
    </div>
    
  );
}
