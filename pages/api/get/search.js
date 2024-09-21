import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { query, type } = req.query; // type 쿼리 파라미터 추가
        console.log('검색 받는중?', query, '타입:', type);

        try {
            const db = (await connectDB).db('forum(next)');
            let results;

            // type에 따라 검색 필드 결정
            if (type === 'title') {
                results = await db.collection('post')
                    .find({ title: { $regex: query, $options: 'i' } })
                    .toArray();
            } else if (type === 'content') {
                results = await db.collection('post')
                    .find({ content: { $regex: query, $options: 'i' } })
                    .toArray();
            } else {
                return res.status(400).json({ message: 'Invalid search type' }); // 잘못된 타입 처리
            }

            console.log('백에서 search 값 전달', results);
            res.status(200).json(results);
        } catch (error) {
            console.error('데이터베이스 쿼리 중 오류 발생:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
