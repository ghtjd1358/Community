import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === 'POST') {
        const appendData = {
            content: req.body.comment, 
            parent: req.body._id,
            author: session.user.email,
            image: session.user.image,
        };

        try {
            const db = (await connectDB).db('forum(next)');
            const results = await db.collection('comment').insertOne(appendData);
            return res.status(200).json({ ...appendData, _id: results.insertedId }); 
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
