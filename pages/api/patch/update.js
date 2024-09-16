import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function update(req, res) {
    if (req.method !== 'PATCH') {
        return res.status(405).json({ message: '허용되지 않은 메서드입니다.' });
    }

    const session = await getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).json({ message: '로그인 후 이용 가능합니다.' });
    }

    const { title, content, _id } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: '제목과 내용을 모두 입력해주세요.' });
    }

    const db = (await connectDB).db('forum(next)');
    const post = await db.collection('post').findOne({ _id: new ObjectId(_id) });

    if (!post) {
        return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
    }

    if (post.author !== session.user.email) {
        return res.status(403).json({ message: '수정 권한이 없습니다.' });
    }

    // 게시글 수정
    try {
        const result = await db.collection('post').updateOne(
            { _id: new ObjectId(_id) },
            { $set: { title, content } }
        );

        // 수정이 성공했는지 확인
        if (result.modifiedCount === 1) {
            return res.status(200).json({ message: '게시글이 성공적으로 수정되었습니다.' });
        } else {
            return res.status(500).json({ message: '게시글 수정에 실패했습니다.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
