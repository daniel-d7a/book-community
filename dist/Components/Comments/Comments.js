"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// @ts-nocheck
const CommentReplyWidget_1 = __importDefault(require("./CommentReplyWidget"));
function Comments({ type, comms, postID }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(CommentReplyWidget_1.default, { type: type, comms: comms, postID: postID }) }));
}
exports.default = Comments;
