"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpDataSchema = exports.loginDataSchema = void 0;
const zod_1 = require("zod");
exports.loginDataSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
    rememberMe: zod_1.z.boolean(),
});
exports.signUpDataSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
    confirmPassword: zod_1.z.string().min(1),
    username: zod_1.z.string().min(1),
});
