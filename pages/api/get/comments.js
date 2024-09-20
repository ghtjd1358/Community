import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function comments(req, res){
    console.log('댓글 보여주기 백엔드', req.query.id)
    
    if(req.method === 'GET'){
        const db = (await connectDB).db('forum(next)');
        const results = await db.collection('comment').find({ parent: req.query.id }).toArray();
        console.log('변환된 ObjectId:', new ObjectId(req.query.id.toString()));
        console.log('성공했잖아?', results)
        return res.status(200).json(results)
    }else{
        return res.status(405).json({ message: "Method not allowed" });
    }
}