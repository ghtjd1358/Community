import { connectDB } from "@/app/database"
import { ObjectId } from "mongodb"


export default async function handler(req, res) {
console.log('리스트', req.query)
    
    const db = (await connectDB).db('forum(next)')
    let result = await db.collection('comment').find({ parent : new ObjectId(req.query.id) }).toArray()
    res.status(200).json(result)
} 
