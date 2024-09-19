import { auth } from "@/configs/auth";
import Link from "next/link";
import FormAddAvatar from '@/components/formAddAvatar';

export default async function Profile() {
  const session = await auth();
  console.log('session: ', session)
  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-2 bg-gray-300 w-96 p-10 rounded-3xl">
        <h2>Имя профиля: {session?.user?.name}</h2>
        <h2>Адрес почты: {session?.user?.email}</h2>
        <h2>Срок авторизации: {session?.expires}</h2>
        {session?.user?.image && <img className="h-48 w-48 rounded-full object-cover" src={session.user.image} alt="image profile" />}
        <Link href={'/admin'}>Ссылка для администратора</Link>
        <FormAddAvatar />
      </div>
    </div>
  );
}
