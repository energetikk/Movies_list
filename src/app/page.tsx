import { auth } from "@/configs/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="h-full flex flex-col justify-center bg-gradient-radial from-sky-400 to-blue-800">
      <div className="text-center">
        {session ? (<h2>Добро пожаловать, {session?.user?.name}!</h2>) : (
        <div>
          <h1 className="text-2xl">Главная страница!</h1>
          <h2 className="text-xl"> Войдите или зарегестрируйтесь, что бы увидеть список фильмов!</h2>
        </div>)}
        
        
        
      </div>
    </main>
  )
}
