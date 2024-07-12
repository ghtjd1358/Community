import { connectDB } from "@/app/database"
import { ObjectId } from "mongodb"
// import { getServerSession } from "next-auth"
// import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req, res){
    // const session = await getServerSession(req, res, authOptions)
    // console.log('삭제 세션', session)
    // console.log('삭제 바디', req.body)

    // if(session){
    //     session.user.email = req.body.email
    // }
    
        if(req.method === 'DELETE'){
            const { _id } = req.body
            console.log('req 바디' , req.body)
            const db = (await connectDB).db('forum(next)')
            const result = await db.collection('post').deleteOne({ _id : new ObjectId(_id)});
            console.log('삭제할 데이터 유저', result)
            return res.status(200).json('삭제완료');
        }
}