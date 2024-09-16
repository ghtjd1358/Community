"use client"; // 클라이언트 컴포넌트임을 명시

import { signIn, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession(); 

  return (
    <>
      <Avatar className="cursor-pointer">
        <AvatarImage src={session?.user?.image || "https://github.com/shadcn.png"} />
        <AvatarFallback></AvatarFallback>
      </Avatar>

      {session ? (
        <Button onClick={() => signOut()} className="w-full mt-2 mb-5">
          로그아웃
        </Button>
      ) : (
        <Button onClick={() => signIn()} className="w-full mt-2 mb-5">
          로그인
        </Button>
      )}
    </>
  );
}
