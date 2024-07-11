'use client'

import { usePathname, useRouter } from "next/navigation"

export default function DetailLink(){
    const router = useRouter()
    const a = usePathname()
    // console.log('에이', a)

    return(
        <button onClick={()=>{router.push('/')}}>버튼</button>
    )
}