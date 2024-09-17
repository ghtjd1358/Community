"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { RHFInput } from "@/components/common/RHFInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { userDefaultValues, userSchemas } from "@/util/schema/user";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss"
import { useDispatch } from "react-redux";
import { fetchRegister } from "@/redux/features/register";


export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(userSchemas.signUpSchema),
    defaultValues: userDefaultValues.signUpDefaultValues,
  });

  const handleSubmit = form.handleSubmit(async (registerForm) => {
    try {
      await dispatch(fetchRegister(registerForm)).unwrap();
      router.push("/");
    } catch (error) {
      console.error("Registration error: ", error);
    }
  });
  

  return (
    <Card className="w-[550px] p-10 h-[650px]">
      <CardHeader>
        <span className={styles.logo}
        >개발 일지</span>
        <CardTitle className="text-xl text-center">회원가입</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <RHFInput name="name" label="Name" placeholder="이름을 입력해주세요." />
              </div>
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
                  placeholder="비밀번호를 입력해쥇요."
                />
              </div>
              <Button type="submit" className="w-full">
                계정생성
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              이미 계정이 있으신가요?{" "}
              <Link href="/auth/login" className="underline">
                로그인
              </Link>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}