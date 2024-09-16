import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function deleteHandler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    console.log('삭제', session)
    console.log('삭제 정보', req.body)

   

    if (req.method === 'DELETE') {
        try {

            if(!session){
                return res.status(401).json({ message : '로그인 후 이용가능합니다.' })
            }

            const db = (await connectDB).db('forum(next)');
            const post = await db.collection('post').findOne({ _id: new ObjectId(req.body._id) });
           
            const result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body._id) });

            if(post.author !== session.user.email){
                return res.status(403).json({ message : '삭제 권한이 없습니다.' })
            }

            if (result.deletedCount === 1) {
                return res.status(200).json({ message: 'Post deleted successfully' });
            } else {
                return res.status(404).json({ message: 'Post not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
