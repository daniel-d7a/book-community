import { z } from "zod";
import { signUpDataSchema } from "./Auth";

export const ApiReplySchema = z.object({
  comment_id: z.string(),
  text: z.string(),
  user_id: z.string(),
  created_at: z.any(),
  user_data: signUpDataSchema,
});

export type ApiReply = z.infer<typeof ApiReplySchema>;
