export default function timerHandler(req, res){
    const timer = new Date()
    console.log(timer)
    return res.status(200).json(timer)
}