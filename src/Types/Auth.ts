import { z } from "zod";

const loginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export type LoginData = z.infer<typeof loginDataSchema>;

const signUpDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
  username: z.string().min(1),
});

export type SignUpData = z.infer<typeof signUpDataSchema>;
