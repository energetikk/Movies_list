import { auth } from "@/configs/auth";

export default async function Profile() {
  const session = await auth();

  return (
    <div>
      <h2>Имя профиля: {session?.user?.name}</h2>
      <h3>Адрес почты: {session?.user?.email}</h3>
      <h3>Срок авторизации: {session?.expires}</h3>
      {session?.user?.image && <img src={session.user.image} alt="" />}
    </div>
  );
}
