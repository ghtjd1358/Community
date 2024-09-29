import axios from 'axios';
import { parseString } from 'xml2js';

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://hojjangfe1358.tistory.com/rss', {
      responseType: 'text',
      headers: {
        'Accept': 'application/xml',
      },
    });
    
    console.log('티스토리 데이터', response.data);

    // xml2js로 XML 데이터를 JSON으로 파싱 수정
    parseString(response.data, (err, result) => {
      if (err) {
        console.error('XML 파싱 에러:', err);
        return res.status(500).json({ message: 'Failed to parse RSS feed' });
      }
      
      res.status(200).json(result);
    });
  } catch (error) {
    console.error('데이터 가져오기 실패:', error);
    res.status(500).json({ message: 'Failed to fetch RSS feed' });
  }
}
