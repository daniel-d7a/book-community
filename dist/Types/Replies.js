"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiReplySchema = void 0;
const zod_1 = require("zod");
const Auth_1 = require("./Auth");
const firestore_1 = require("firebase/firestore");
exports.ApiReplySchema = zod_1.z.object({
    comment_id: zod_1.z.string(),
    text: zod_1.z.string(),
    user_id: zod_1.z.string(),
    created_at: zod_1.z.instanceof(firestore_1.Timestamp),
    user_data: Auth_1.signUpDataSchema,
});
