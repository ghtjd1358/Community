import { connectDB } from "@/app/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
    const session = await getServerSession(req, res, authOptions)
    console.log('유저 정보 댓글부대', session)

    if( req.method === 'POST' ){
        // console.log('댓글 부대', req.body)

        let resultsData = {
            content : req.body.comment,
            parent : new ObjectId(req.body._id) ,
            author : session.user.email,
            username : session.user.name
        }

        const db = (await connectDB).db('forum(next)');
        const result = await db.collection('comment').insertOne(resultsData)
        
        return res.status(200).json('댓글 부대 완성')
    }
    
}