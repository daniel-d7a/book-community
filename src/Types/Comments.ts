import { z } from "zod";
import { signUpDataSchema } from "./Auth";
import { Timestamp } from "firebase/firestore";

export const apiCommentSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
  user_id: z.string(),
  post_id: z.string(),
  created_at: z.instanceof(Timestamp),
  reply_ids: z.array(z.string()),
  votes: z.number(),
  voter_ids: z.array(z.string()),
  user_data: signUpDataSchema,
});

export type ApiComment = z.infer<typeof apiCommentSchema>;
