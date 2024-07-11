import { connectDB } from "./database"

export default async function Home() {
  const client = await connectDB
  const db = client.db('forum(next)')
  let results = await db.collection('post').find().toArray()
  console.log(results)

  return (
    <div>안녕</div>
  )
}