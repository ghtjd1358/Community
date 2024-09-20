import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function signup(req, res) {
  const { name, email, password } = req.body;

  if (req.method === 'POST') {
    // 입력 값이 모두 비어 있지 않은지 확인
    if (name !== '' && email !== '' && password !== '') {
      try {
        const db = (await connectDB).db('forum(next)');
        
        // 이메일 중복 확인
        const existingUser = await db.collection('user_cred').findOne({ email });

        if (existingUser) {
          return res.status(400).json({ message: 'Email is already in use.' });
        }

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 사용자 데이터 준비
        const userData = { name, email, password: hashedPassword };

        // 새로운 사용자 데이터 삽입
        await db.collection('user_cred').insertOne(userData);

        // 성공 메시지 반환
        return res.status(200).json({ message: 'User registered successfully' });

      } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      // 필수 입력 값이 없을 경우 오류 메시지 반환
      return res.status(400).json({ message: 'All fields are required.' });
    }
  } else {
    // POST 메소드가 아닌 경우
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
