import { z } from "zod";
import { signUpDataSchema } from "./Auth";
import { Timestamp } from "firebase/firestore";

export const apiChatSchema = z.object({
    id: z.string(),
    user_ids: z.array(z.string()),
    message_ids: z.array(z.string()),
    u1: z.string(),
    u2: z.string()
  });

export type ApiChat = z.infer<typeof apiChatSchema>;