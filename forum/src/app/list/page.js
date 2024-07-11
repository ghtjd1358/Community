import { connectDB } from "../database"
import ListItem from "./ListItem"
// import DetailLink from "./DetailLink"

export default async function List() {
    const db = (await connectDB).db('forum(next)')
    let result = await db.collection('post').find().toArray()
    console.log(result)

    return (
        <ListItem result={result}></ListItem>
    )
  } 