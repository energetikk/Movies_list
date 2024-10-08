import { auth } from "@/configs/auth";
 
export default async function Page() {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>
 
  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  )
}