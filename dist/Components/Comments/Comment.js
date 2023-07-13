"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("@material-tailwind/react");
const bi_1 = require("react-icons/bi");
const CommentBody_1 = __importDefault(require("./CommentBody"));
function Comment({ user, comment, type, commID }) {
    const [upVoted, setUpvoted] = (0, react_1.useState)(false);
    const [downVoted, setDownvoted] = (0, react_1.useState)(false);
    const [open, setOpen] = (0, react_1.useState)(0);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-11/12", children: [(0, jsx_runtime_1.jsx)(CommentBody_1.default, { profile: user.profile, state: user.state, username: user.username, text: comment.text, type: "c" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex gap-2", children: (0, jsx_runtime_1.jsxs)("p", { className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-teal-500" : "text-white"}`, onClick: () => { } }), " 5 ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => { } })] }) }), (0, jsx_runtime_1.jsxs)(react_2.Accordion, { open: open === 1, className: "pl-4", children: [(0, jsx_runtime_1.jsx)(react_2.AccordionHeader, { onClick: () => handleOpen(1), className: "text-xs mb-2 underline", children: open === 0 ? `show ${comment.replies.length} replies` : "hide replies" }), (0, jsx_runtime_1.jsxs)(react_2.AccordionBody, { className: "flex flex-wrap gap-2", children: [comment.replies.map(reply => (0, jsx_runtime_1.jsx)(CommentBody_1.default, { profile: reply.user.profile, state: reply.user.state, username: reply.user.username, text: reply.text, type: "r" })), (0, jsx_runtime_1.jsx)("div", { className: "w-full flex justify-center", children: (0, jsx_runtime_1.jsx)("div", { className: "form-control w-full", children: (0, jsx_runtime_1.jsxs)("div", { className: "input-group w-full", children: [(0, jsx_runtime_1.jsx)("textarea", { placeholder: "Add a reply", className: "py-3 pl-3 bg-slate-800 overflow-hidden break-words resize-none outline-none border-none w-full h-12" }), (0, jsx_runtime_1.jsx)("button", { className: "btn btn-square border-none bg-yellow-500", children: (0, jsx_runtime_1.jsx)(bi_1.BiSend, { className: "text-2xl text-white" }) })] }) }) })] })] })] })] }));
}
exports.default = Comment;
