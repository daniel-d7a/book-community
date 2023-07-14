"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tfi_1 = require("react-icons/tfi");
const Comments_1 = __importDefault(require("../Comments/Comments"));
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
function Post({ user, post }) {
    const [votes, setVotes] = (0, react_1.useState)(post.votes);
    const [upVoted, setUpvoted] = (0, react_1.useState)(false);
    const [downVoted, setDownvoted] = (0, react_1.useState)(false);
    function handleclick(amount) {
        if (!upVoted && !downVoted) {
            if (amount === 1) {
                setUpvoted(true);
            }
            else if (amount === -1) {
                setDownvoted(true);
            }
            // @ts-ignore
            post.setVotes(amount);
            setVotes(post.votes);
        }
        else if (upVoted && amount === 1) {
            setUpvoted(false);
            // @ts-ignore
            post.setVotes(-amount);
            setVotes(post.votes);
        }
        else if (upVoted && amount === -1) {
            setUpvoted(false);
            setDownvoted(true);
            // @ts-ignore
            post.setVotes(2 * amount);
            setVotes(post.votes);
        }
        else if (downVoted && amount === -1) {
            setDownvoted(false);
            // @ts-ignore
            post.setVotes(-amount);
            setVotes(post.votes);
        }
        else if (downVoted && amount === 1) {
            setUpvoted(true);
            setDownvoted(false);
            // @ts-ignore
            post.setVotes(2 * amount);
            setVotes(post.votes);
        }
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "card max-w-2xl mx-auto w-full bg-base-100 shadow-xl mb-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center pt-4 pl-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("img", { 
                                        // @ts-ignore
                                        src: user.profile, alt: "Shoes", className: " w-12 h-12 rounded-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { className: `absolute bottom-0 right-0 w-5 h-5 rounded-full ${
                                        // @ts-ignore
                                        user.state === "r" ? "bg-teal-500" : "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`, children: user.state === "r" ? (0, jsx_runtime_1.jsx)(bi_1.BiBookReader, {}) : (0, jsx_runtime_1.jsx)(bi_1.BiEditAlt, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("a", { href: "#", children: [user.username || "user", " /", " ", (0, jsx_runtime_1.jsx)("a", { href: "#", children: post.community.length > 15
                                                    ? // @ts-ignore
                                                        post.community.substring(0, 15) + "..."
                                                    : // @ts-ignore
                                                        post.community })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 text-xs text-zinc-400", children: [(0, jsx_runtime_1.jsxs)("p", { children: [post.date, " minutes ago"] }), (0, jsx_runtime_1.jsxs)("a", { href: "#", className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)(tfi_1.TfiLocationPin, {}), " ", post.location] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dropdown dropdown-end ml-auto mr-4", children: [(0, jsx_runtime_1.jsx)("label", { tabIndex: 0, className: "", children: (0, jsx_runtime_1.jsx)(bi_1.BiDotsHorizontalRounded, { className: "text-2xl" }) }), (0, jsx_runtime_1.jsxs)("ul", { tabIndex: 0, className: "dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Hide" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Report" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Copy Link" }) })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "pl-4 pt-4", children: (0, jsx_runtime_1.jsx)("p", { children: post.text }) }), (0, jsx_runtime_1.jsx)("figure", { className: "px-4 pt-4", children: (0, jsx_runtime_1.jsx)("img", { src: post.image, className: "" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center px-4 py-2", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-teal-500" : "text-white"}`, onClick: () => {
                                            handleclick(1);
                                        } }), " ", votes, " ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => {
                                            handleclick(-1);
                                        } })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: `comments_${post.id}`, className: "flex gap-2 items-center", onClick: () => (document.body.style.overflow = "hidden"), children: [(0, jsx_runtime_1.jsx)(bi_1.BiCommentDetail, {}), " ", post.comments.length] }), (0, jsx_runtime_1.jsx)(bi_1.BiShareAlt, {}), (0, jsx_runtime_1.jsx)(bi_1.BiStar, { className: "ml-auto" })] })] }), (0, jsx_runtime_1.jsx)(Comments_1.default, { comms: post.comments, type: "Comments", postID: post.id })] }));
}
exports.default = Post;
