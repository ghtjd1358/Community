import { connectDB } from "@/app/database";

export default async function handler(req, res){

    if(req.method === 'POST'){  
        if(req.body.title !== ''){
            const db = (await connectDB).db('forum(next)');
            const result = await db.collection('post').insertOne(req.body)
             console.log(req.body);
             return res.status(200).redirect('/list') 
        }
    }
    
    
    
}