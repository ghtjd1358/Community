import { connectDB } from "@/app/database";
import { ObjectId } from "mongodb";




export default async function Edit(props) {

    const db = (await connectDB).db('forum(next)');
    const result = await db.collection('post').findOne({ _id : new ObjectId(props.params.id)})
    console.log('결과값', result);
    console.log('찾아올 정보', props.params.id)

    return (
      <div className="p-20">
        <h4>수정페이지</h4>
        <form action="/api/post/edit" method="POST">
          <input type="text" name="title" defaultValue= {result.title}/>
          <input type="text" name="content" defaultValue= {result.content} />
          <input style={{display : 'none'}} type="text" name="_id" defaultValue= {result._id.toString()} />
          <button type="submit">전송</button>
        </form>
      </div>
    )
  } 