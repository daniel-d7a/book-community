"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Comment_1 = __importDefault(require("./Comment"));
const bi_1 = require("react-icons/bi");
function CommentReplyWidget({ type, comms, postID }) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", id: `${type === "Comments" ? "comments" : "replies"}_${postID}`, className: "modal-toggle" }), (0, jsx_runtime_1.jsx)("div", { className: `modal justify-center z-${type === "20" ? "comments" : "50"}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "modal-box px-0 pb-0 bg-slate-700", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-bold text-lg mb-4 ml-8", children: type }), (0, jsx_runtime_1.jsx)("div", { className: "overflow-y-scroll w-full max-h-72 flex flex-wrap justify-center gap-2", children: comms.map(comm => (0, jsx_runtime_1.jsx)(Comment_1.default, { type: type, user: comm.user, comment: comm })) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center pt-2 px-2", children: (0, jsx_runtime_1.jsx)("div", { className: "form-control w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "input-group w-full", children: [(0, jsx_runtime_1.jsx)("textarea", { placeholder: `Add a ${type === "Comments" ? "Comment" : "Reply"}`, className: "py-3 pl-3 bg-slate-800 overflow-hidden break-words resize-none outline-none border-none w-full h-12" }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-square bg-yellow-500 border-none", children: (0, jsx_runtime_1.jsx)(bi_1.BiSend, { className: "text-2xl text-white" }) })] }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "modal-action", children: (0, jsx_runtime_1.jsx)("label", { htmlFor: `${type === "Comments" ? "comments" : "replies"}_${postID}`, onClick: () => type === "Comments" ? document.body.style.overflow = 'unset' : document.body.style.overflow = 'hidden', className: "btn btn-sm btn-circle btn-ghost absolute right-2 top-2", children: "\u2715" }) })] }) })] }));
}
exports.default = CommentReplyWidget;
