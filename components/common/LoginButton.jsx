"use client"; 

import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const { data: session } = useSession(); 
  console.log('session', session)
  const router = useRouter()

  return (
    <>
      <Avatar className="cursor-pointer">
        <AvatarImage onClick={()=>router.push(`/user/${session?.user?.name}`)} src={session?.user?.image || "https://github.com/shadcn.png"} />
        <AvatarFallback></AvatarFallback>
      </Avatar>

      {session ? (
        <Button onClick={() => signOut()} className="w-full mt-2 mb-5">
          로그아웃
        </Button>
      ) : (
        <Button onClick={()=>router.push('/login')} className="w-full mt-2 mb-5">
          로그인
        </Button>
      )}
    </>
  );
}
