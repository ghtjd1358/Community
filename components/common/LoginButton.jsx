'use client'

import { signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'

export default function LoginButton({ session }) {
    console.log("props", session)
    return (
        <>
            <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button 
                onClick={() => { session ? signOut() : signIn() }} 
                className="w-full mt-2 mb-5"
            >
                {session ? '로그아웃!' : '로그인'}
            </Button>
        </>
    )
}
