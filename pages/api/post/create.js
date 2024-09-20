import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
    const {title, content} = req.body 
    const session = await getServerSession(req, res, authOptions)
    
    if(session){
        req.body.author = session.user.email
    }

    if(req.method === 'POST'){
        if(title === '' || content === ''){
            return res.status(400).json('제목, 내용을 적어주세요.')
        }
        
        const db = (await connectDB).db('forum(next)');
        const results = await db.collection('post').insertOne(req.body); 
        console.log('글추가', req.body)
        return res.status(200).json({ ...req.body, _id: results.insertedId })
    }
}