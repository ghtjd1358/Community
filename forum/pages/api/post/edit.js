import { connectDB } from "@/app/database"
import { ObjectId } from "mongodb";


export default  async function handler(req, res){
    if(req.method === 'POST'){
        console.log(req.body)  
        const db = (await connectDB).db('forum(next)');
        const { title , content, _id } = req.body;
        let result = await db.collection('post').updateOne({ _id : new ObjectId(_id) }, {$set : { title : title, content : content }})
        // updateOne({바꿀 기존 게시물}, ${set : {바꿀 내용}})
        console.log('수정데이터', req.body);
        return res.status(200).redirect('/list')
    }
}