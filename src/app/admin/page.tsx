import { auth } from "@/configs/auth";
import { db } from "@/lib/db";
import { UserList } from '@/components/UserList';
import FormAddFilm from '@/components/formAddFilm';

export default async function Page() {

  const session = await auth();
  const allUsers = await db.user.findMany({})

  if (session?.user?.role === "admin") {
    return (
      <div className="flex gap-10">
        <div>
          <p className="bg-green-600">Вы Администратор, добро пожаловать!</p>
          <p className="mt-10 mb-4">Список пользователей:</p>
          <ul className="flex flex-col gap-5">
            {allUsers.map((card) => (
              <UserList key={card.id} card={card} />
            ))}
          </ul>
        </div>
        <div>
          <p className="font-medium mb-4">Добавить новый фильм:</p>
          <FormAddFilm />
        </div>

      </div>
    )
  }

  return <p className="bg-red-600">У вас нет доступа для просмотра этой страницы!</p>;
}