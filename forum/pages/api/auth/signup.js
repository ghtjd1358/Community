import { connectDB } from "@/app/database";
import bcrypt from 'bcrypt';
export default async function handler(req, res){
    if(req.method === 'POST'){
        const { password, ...rest} = req.body;
        const hash = await bcrypt.hash(password, 10)
        console.log('hash 암호화', hash);
        console.log('body 암호화할 목록', req.body);
        const db = (await connectDB).db('forum(next)');
        await db.collection('user_cred').insertOne({...rest, password : hash});
    }
}