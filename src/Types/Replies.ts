import { z } from "zod";
import { signUpDataSchema } from "./Auth";
import { Timestamp } from "firebase/firestore";

export const ApiReplySchema = z.object({
  comment_id: z.string(),
  text: z.string(),
  user_id: z.string(),
  created_at: z.instanceof(Timestamp),
  user_data: signUpDataSchema,
});

export type ApiReply = z.infer<typeof ApiReplySchema>;
