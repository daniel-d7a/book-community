"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginDataSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
    rememberMe: zod_1.z.boolean(),
});
const signUpDataSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
    confirmPassword: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
});
