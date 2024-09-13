// /api/get/read.js
import { connectDB } from "@/util/database";

export default async function read(req, res){
    if(req.method === "GET"){
        const db = (await connectDB).db('forum(next)');
        const results = await db.collection('post').find().toArray(); 
        return res.status(200).json(results);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
