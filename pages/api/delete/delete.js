import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function deleteHandler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const db = (await connectDB).db('forum(next)');
            const result = await db.collection('post').deleteOne({ _id: new ObjectId(req.body._id) });

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
