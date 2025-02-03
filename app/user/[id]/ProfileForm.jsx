import { Button } from "@/components/ui/button";
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
import { userSchemas } from "@/util/schema/user";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchUpdateProfile } from "@/redux/features/profileSlice";

export default function ProfileForm({ userData }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(userSchemas.updateProfileSchema),
    defaultValues: {
      name: userData.name,
      email: userData.email,
    },
  });

  const handleSubmit = form.handleSubmit(async (updateForm) => {
    try {
      await dispatch(fetchUpdateProfile(updateForm)).unwrap();
      router.push("/profile");
    } catch (error) {
      console.error("Profile update error: ", error);
    }
  });

  return (
    <Card className="w-[550px] p-10 h-[500px]">
      <CardHeader>
        <span className="font-bold text-2xl text-center">개발 일지</span>
        <CardTitle className="text-xl text-center">프로필 수정</CardTitle>
        <CardDescription className="text-center">
          프로필 정보를 수정하세요.
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
                  disabled={true}
                />
              </div>
              <Button type="submit" className="w-full">
                프로필 수정
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
