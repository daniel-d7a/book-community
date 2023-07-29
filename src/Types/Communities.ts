import { z } from "zod";

export const communitySchema = z.object({
  name: z.string(),
  description: z.string(),
  profile_photo: z.instanceof(File).optional(),
  banner_photo: z.instanceof(File).optional(),
  book_category: z.string(),
  owner_id: z.string(),
  type: z.enum(["public", "private"]),
  user_ids: z.array(z.string()),
  post_ids: z.array(z.string()),
  mod_ids: z.array(z.string()),
});

export type Community = z.infer<typeof communitySchema>;

export const apiCommunitySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  profile_photo: z.string().optional(),
  banner_photo: z.string().optional(),
  book_category: z.string(),
  owner_id: z.string(),
  type: z.enum(["public", "private"]),
  user_ids: z.array(z.string()),
  post_ids: z.array(z.string()),
  mod_ids: z.array(z.string()),
});

export type ApiCommunity = z.infer<typeof apiCommunitySchema>;
