import { connectDB } from "@/app/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
    const session = await getServerSession(req,res,authOptions)
    console.log('글작성페이지 세션', session)

    if(session){
        req.body.author = session.user.email
    }
    console.log('이것은 바디', req.body)

    if(req.method === 'POST'){  
        if(req.body.title !== ''){
            const db = (await connectDB).db('forum(next)');
            const result = await db.collection('post').insertOne(req.body)
             console.log(req.body);
             return res.status(200).redirect('/list') 
        }
    }    
}