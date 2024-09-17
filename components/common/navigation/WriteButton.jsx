"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function WriteButton() {
  const router = useRouter();
  const { data: session } = useSession();

  const handlerWrite = async () => {
    try {
      if (session) {
        router.push("/write");
      } else {
        await Swal.fire({
          title: '로그인 필요',
          text: '로그인 후 글을 작성할 수 있습니다.',
          icon: 'warning',
          confirmButtonText: '확인',
          confirmButtonColor: '#ff7f50', // 커스텀 색상 추가
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={handlerWrite}
        variant={"outline"}
        className="w-full text-orange-500 border-orange-400 hover:bg-orange-100 hover:text-orange-600"
      >
        글작성
      </Button>
    </>
  );
}
