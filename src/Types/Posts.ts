import { z } from "zod";
import { signUpDataSchema } from "./Auth";
import { Timestamp } from "firebase/firestore";

export const postSchema = z.object({
  text: z.string().min(1),
  images: z.array(z.instanceof(File)),
});

export type Post = z.infer<typeof postSchema>;

export const apiPostSchema = z.object({
  id: z.string(),
  comment_ids: z.array(z.string()),
  votes: z.number(),
  voter_ids: z.array(
    z.object({
      id: z.string(),
      vote: z.enum(["up", "down"]),
    })
  ),
  text: z.string().min(1),
  user_id: z.string(),
  created_at: z.instanceof(Timestamp),
  user_data: signUpDataSchema,
  images: z.array(z.string()),
});

export type ApiPost = z.infer<typeof apiPostSchema>;
