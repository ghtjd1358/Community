import { connectDB } from "@/app/database"
import { ObjectId } from "mongodb"

export default async function handler(req, res){
        if(req.method === 'POST'){
            const { _id } = req.body
            const db = (await connectDB).db('forum(next)')
            const result = await db.collection('post').deleteOne({ _id : new ObjectId(_id)});
            console.log(result)
            return res.status(200).json({ success: true });
        }
}