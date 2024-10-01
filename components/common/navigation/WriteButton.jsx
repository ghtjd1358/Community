"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function WriteButton() {
  const router = useRouter();

  const handlerWrite = async () => {
        router.push("/write");
  }

  return (
    <>
      <Button
        onClick={handlerWrite}
        variant={"outline"}
        className="w-full text-orange-500 border-orange-400 hover:bg-orange-100 hover:text-orange-600 -mt-5"
      >
        글작성
      </Button>
    </>
  );
}
