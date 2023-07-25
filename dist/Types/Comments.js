"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiCommentSchema = void 0;
const zod_1 = require("zod");
const Auth_1 = require("./Auth");
exports.apiCommentSchema = zod_1.z.object({
    id: zod_1.z.string(),
    text: zod_1.z.string().min(1),
    user_id: zod_1.z.string(),
    post_id: zod_1.z.string(),
    created_at: zod_1.z.any(),
    reply_ids: zod_1.z.array(zod_1.z.string()),
    votes: zod_1.z.number(),
    voter_ids: zod_1.z.array(zod_1.z.string()),
    user_data: Auth_1.signUpDataSchema,
});
