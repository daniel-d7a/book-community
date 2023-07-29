"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPostSchema = exports.postSchema = void 0;
const zod_1 = require("zod");
const Auth_1 = require("./Auth");
const firestore_1 = require("firebase/firestore");
exports.postSchema = zod_1.z.object({
    text: zod_1.z.string().min(1),
    images: zod_1.z.array(zod_1.z.instanceof(File)),
});
exports.apiPostSchema = zod_1.z.object({
    id: zod_1.z.string(),
    comment_ids: zod_1.z.array(zod_1.z.string()),
    votes: zod_1.z.number(),
    voter_ids: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        vote: zod_1.z.enum(["up", "down"]),
    })),
    text: zod_1.z.string().min(1),
    user_id: zod_1.z.string(),
    created_at: zod_1.z.instanceof(firestore_1.Timestamp),
    user_data: Auth_1.signUpDataSchema,
    images: zod_1.z.array(zod_1.z.string()),
});
