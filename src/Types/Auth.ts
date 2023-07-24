import { z } from "zod";

export const loginDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export type LoginData = z.infer<typeof loginDataSchema>;

export const signUpDataSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
  username: z.string().min(1),
  type: z.string().min(1).max(1),
  profile_photo: z.string().optional(),
});

export type SignUpData = z.infer<typeof signUpDataSchema>;
