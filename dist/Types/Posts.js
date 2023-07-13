"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const postSchema = zod_1.z.object({
    text: zod_1.z.string().min(1),
});
