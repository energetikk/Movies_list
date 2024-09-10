import { auth } from "@/configs/auth";
import Link from "next/link";

export default async function Profile() {
  const session = await auth();
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 bg-gray-300 w-96">
        <h2>Имя профиля: {session?.user?.name}</h2>
        <h2>Адрес почты: {session?.user?.email}</h2>
        <h2>Срок авторизации: {session?.expires}</h2>
        {session?.user?.image && <img className="h-48 w-48" src={session.user.image} alt="image profile" />}
        <Link href={'/admin'}>Ссылка для администратора</Link>
      </div>
    </div>

  );
}
