import { connectDB } from "@/app/database";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { title, content } = req.body;
            
            if (title && title.trim() !== '' && content && content.trim() !== '') {
                const db = (await connectDB).db('forum(next)');
                const result = await db.collection('post').insertOne({ title, content });
                console.log(req.body);
                return res.status(200).redirect('/list');
            } else {
                return res.status(400).json({ message: 'Title and content are required' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}
