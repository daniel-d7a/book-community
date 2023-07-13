import { z } from "zod";

const postSchema = z.object({
  text: z.string().min(1),
});

export type Post = z.infer<typeof postSchema>;
