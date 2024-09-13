import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";



export default async function  Detail(props) {
  console.log(props)
  const { id } = props.params
  const db = (await connectDB).db('forum(next)');
  const results = await db.collection('post').findOne({ _id : new ObjectId({id}) }); 
  console.log(results)

  return (
    <>
      <h1>{results.content}</h1>
    </>
  )
}
