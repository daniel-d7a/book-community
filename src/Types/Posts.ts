import { z } from "zod";
import { signUpDataSchema } from "./Auth";

export const postSchema = z.object({
  text: z.string().min(1),
});

export type Post = z.infer<typeof postSchema>;

export const apiPostSchema = z.object({
  id: z.string(),
  comment_ids: z.array(z.string()),
  votes: z.number(),
  voter_ids: z.array(z.string()),
  text: z.string().min(1),
  user_id: z.string(),
  created_at: z.any(),
  user_data: signUpDataSchema,
});

export type ApiPost = z.infer<typeof apiPostSchema>;
