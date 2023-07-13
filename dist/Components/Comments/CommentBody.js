"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const bi_1 = require("react-icons/bi");
function CommentBody({ profile, state, username, text, type }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 rounded-md w-full bg-slate-600 px-2 py-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative shrink-0 h-8 w-fit", children: [(0, jsx_runtime_1.jsx)("img", { src: profile, alt: "Shoes", className: `${type === 'c' ? "w-10" : "w-8"} ${type === 'c' ? "h-10" : "h-8"} rounded-full object-cover` }), (0, jsx_runtime_1.jsx)("div", { className: `absolute ${type === 'c' ? "-bottom-2 right-0 w-4 h-4 text-[8px]" : "-bottom-1 right-0 w-3 h-3 text-[6px]"}  rounded-full ${state === "r" ? "bg-teal-500" : "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center`, children: state === "r" ? (0, jsx_runtime_1.jsx)(bi_1.BiBookReader, {}) : (0, jsx_runtime_1.jsx)(bi_1.BiEditAlt, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: `text-${type === 'c' ? "sm" : "xs"} font-bold`, children: (0, jsx_runtime_1.jsxs)("a", { href: "#", children: [username || "user", " "] }) }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs", children: text })] })] }));
}
exports.default = CommentBody;
