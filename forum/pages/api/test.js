
export default function handler(req, res){
    if(req.method == 'POST'){

        return res.status(200).json('처리완료')
    }else{
        return res.status(200).json('처리완료')
    }
    
}