import { z } from "zod";

// 스키마 정의
const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Z])/, "One uppercase letter.")
  .regex(/^(?=.*[a-z])/, "One lowercase letter.")
  .regex(/^(?=.*\d)/, "One digit.")
  .regex(/^(?=.*[\W_])/, "One special character.")
  .min(8, { message: "At least 8 characters." });

const emailSchema = z
  .string()
  .min(1, { message: "Email required." })
  .email({ message: "Invalid email." });

const nameSchema = z
  .string()
  .min(1, { message: "Name required." })
  .max(20, { message: "Less than 20 characters." });

const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// 기본값을 추출하는 함수 정의
const extractDefaultValues = (schema) => {
  const defaultValues = {};
  Object.keys(schema.shape).forEach((key) => {
    defaultValues[key] = ""; // 각 필드를 빈 문자열로 설정
  });
  return defaultValues;
};

export const userSchemas = {
  signUpSchema,
  loginSchema,
};

export const userDefaultValues = {
  signUpDefaultValues: extractDefaultValues(signUpSchema),
  loginDefaultValues: extractDefaultValues(loginSchema),
};
