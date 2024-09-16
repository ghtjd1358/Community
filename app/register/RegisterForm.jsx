
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
import { useState } from "react";
import styles from "./page.module.scss"

export default function Register() {
  const router = useRouter()

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(userSchemas.signUpSchema),
    defaultValues: userDefaultValues.signUpDefaultValues,
  });

  const handleSubmit = form.handleSubmit((data) => {
    console.log("Form submitted:", data);
    router.push("/");
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
                <RHFInput name="name" label="Name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <RHFInput
                  name="email"
                  label="Email"
                  placeholder="m@example.com"
                />
              </div>
              <div className="grid gap-2">
                <RHFInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder=""
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
            <div className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}