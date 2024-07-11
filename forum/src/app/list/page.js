import Link from "next/link"
import { connectDB } from "../database"
// import DetailLink from "./DetailLink"

export default async function List() {
    const db = (await connectDB).db('forum(next)')
    let result = await db.collection('post').find().toArray()
    console.log(result)

    return (
      <div className="list-bg">
        {
            result.map((item)=>{
                return(
                    
                   <div className="list-item">
                    <Link prefetch={false} href={`/detail/${item._id}`}>{item.title}</Link>    
                    <p>{item.content}</p>
                    <Link href={`/edit/${item._id}`} className="list-btn">✏️</Link>
                    {/* <DetailLink/> */}
                    </div>
                )
            })
        }
      </div>
    )
  } 