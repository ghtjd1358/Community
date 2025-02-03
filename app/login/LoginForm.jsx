"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RHFInput } from "@/components/common/RHFInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { userDefaultValues, userSchemas } from "@/util/schema/user";

export default function Login() {
  const router = useRouter();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(userSchemas.loginSchema),
    defaultValues: userDefaultValues.loginDefaultValues,
  });

  const handleSubmit = form.handleSubmit(async (loginForm) => {
    try {
      await signIn('credentials', { email: loginForm.email, password: loginForm.password, redirect: false });
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  });

  return (
      <Card className="w-[400px] p-10">
        <CardHeader>
          <CardTitle className="text-xl text-center">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <RHFInput
                    name="email"
                    label="Email"
                    placeholder="이메일을 입력해주세요."
                  />
                </div>
                <div className="grid gap-2">
                  <RHFInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                  />
                </div>
                <Button type="submit" className="w-full">
                  로그인
                </Button>
              </div>
                <p className="text-center text-gray-400 text-sm gap-2">계정이 없으신가요?<span className="underline cursor-pointer text-black ml-2 font-semibold" onClick={()=>router.push('/register')}>회원가입</span></p>
            </form>
          </FormProvider>
          <Button
        onClick={() => signIn('github')}
        className="text-white px-4 py-2 rounded mt-4 w-full font-semibold gap-3"
      >
        <img className="w-6 h-6" src="https://img.icons8.com/ios11/512/FFFFFF/github.png" alt="logo"/>
         GitHub 계정으로 로그인
      </Button>
        </CardContent>
      </Card>
  );
}
