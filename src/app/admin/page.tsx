import { auth } from "@/configs/auth";
import { db } from "@/lib/db";
import { UserList } from '@/components/UserList';
import {createCardFilm} from '@/actions/auth-actions';
 
export default async function Page() {
  const session = await auth();
  const allUsers = await db.user.findMany({})
 
  if (session?.user?.role === "admin") {
    return (
    <>
        <p className="bg-green-600">You are an admin, welcome!</p>
        <p>Список пользователей:</p>
        {/* <section className="movies-cards-list"> */}
        <ul className="flex flex-col gap-5">
          {allUsers.map((card) => (
            <UserList key={card.id} card={card} />
          ))}
        </ul>
      {/* </section> */}
      <p className="font-medium">добавить новый фильм:</p>
      <form action={createCardFilm} className="flex flex-col gap-5 w-52">
          <input type="text" name="title" placeholder="title" />
          <input type="text" name="link" placeholder="link" />
          <input type="text" name="image" placeholder="image" />
          <input type="text" name="duration" placeholder="duration" />
          <button type="submit">Сохранить</button>
      </form>
    </>
    )
  }
 
  return <p className="bg-red-600">You are not authorized to view this page!</p>;
}