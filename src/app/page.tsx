import { Header } from '../components/header';


export default function Home() {
  return (
    <main className="h-full flex flex-col bg-gradient-radial from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
          <Header />
      </div>
    </main>
  )
}
