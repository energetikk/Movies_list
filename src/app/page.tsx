import { auth } from "@/configs/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="h-full flex flex-col justify-center bg-gradient-radial from-sky-400 to-blue-800">
      <div className="text-center">
        <span>
          <h1 className="text-2xl">Главная страница!</h1>
          <h3>Адрес почты: {session?.user?.email}</h3>
        </span>
          <h2 className="text-xl"> Войдите или зарегестрирутесь, что бы увидеть спсиок фильмов!</h2>
      </div>
    </main>
  )
}
