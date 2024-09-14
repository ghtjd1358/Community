import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";



export default async function update(req, res){
    console.log('백 업데이트', req.body)
    const {title, content, _id} = req.body 
    if(req.method === 'PATCH'){
        if(title === '' || content === ''){
            return res.status(500).json('제목, 내용을 적어주세요.')
        }
    }
    const db = (await connectDB).db('forum(next)');
    const results = await db.collection('post').updateOne({_id : new ObjectId(_id)},{$set : {title : title, content : content}}); //inc 고려했으나 사용하지 않았다.
    return res.status(200).json({ ...req.body, _id: results.insertedId })
}