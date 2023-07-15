"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tfi_1 = require("react-icons/tfi");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
function Post({ user, post }) {
    const [votes, setVotes] = (0, react_1.useState)(post.votes);
    const [upVoted, setUpvoted] = (0, react_1.useState)(false);
    const [downVoted, setDownvoted] = (0, react_1.useState)(false);
    function getDate(timestamp) {
        const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
        const date = new Date(milliseconds); // Create a new Date object from the milliseconds
        const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad it with a leading zero if necessary
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (Note: January is 0) and pad it with a leading zero if necessary
        const year = date.getFullYear().toString(); // Get the full year
        const formattedDate = `${day}/${month}/${year}`; // Combine the day, month, and year to get the formatted date
        return formattedDate;
    }
    function handleclick(amount) {
        if (!upVoted && !downVoted) {
            if (amount === 1) {
                setUpvoted(true);
            }
            else if (amount === -1) {
                setDownvoted(true);
            }
            post.votes += amount;
            setVotes(post.votes);
        }
        else if (upVoted && amount === 1) {
            setUpvoted(false);
            post.votes -= amount;
            setVotes(post.votes);
        }
        else if (upVoted && amount === -1) {
            setUpvoted(false);
            setDownvoted(true);
            post.votes += 2 * amount;
            setVotes(post.votes);
        }
        else if (downVoted && amount === -1) {
            setDownvoted(false);
            post.votes -= amount;
            setVotes(post.votes);
        }
        else if (downVoted && amount === 1) {
            setUpvoted(true);
            setDownvoted(false);
            post.votes += 2 * amount;
            setVotes(post.votes);
        }
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "rounded-md pb-4 bg-slate-950 max-w-2xl mx-auto w-fullshadow-xl mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center pt-4 pl-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("img", { src: user && user.profile
                                        ? user.profile
                                        : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: " w-12 h-12 rounded-full object-cover" }), (0, jsx_runtime_1.jsx)("div", { className: `absolute bottom-0 right-0 w-5 h-5 rounded-full ${user.state === "r" ? "bg-teal-500" : "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`, children: user.state === "r" ? (0, jsx_runtime_1.jsx)(bi_1.BiBookReader, {}) : (0, jsx_runtime_1.jsx)(bi_1.BiEditAlt, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsxs)("a", { href: "#", className: "text-lg font-bold", children: [user.username || "user", " ", post.community && "/", " ", (0, jsx_runtime_1.jsx)("a", { href: "#", children: post.community && post.community.length > 15
                                                ? post.community.substring(0, 15) + "..."
                                                : post.community })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 text-xs text-zinc-400", children: [(0, jsx_runtime_1.jsx)("p", { children: getDate(post.created_at) }), post.location && ((0, jsx_runtime_1.jsxs)("a", { href: "#", className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)(tfi_1.TfiLocationPin, {}), " ", post.location] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "dropdown dropdown-end ml-auto mr-4", children: [(0, jsx_runtime_1.jsx)("label", { tabIndex: 0, className: "", children: (0, jsx_runtime_1.jsx)(bi_1.BiDotsHorizontalRounded, { className: "text-2xl" }) }), (0, jsx_runtime_1.jsxs)("ul", { tabIndex: 0, className: "dropdown-content menu p-2 shadow rounded-box w-52 bg-slate-950", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Hide" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Report" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Copy Link" }) })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "pl-4 pt-4", children: (0, jsx_runtime_1.jsx)("p", { children: post.text }) }), post.image && ((0, jsx_runtime_1.jsx)("figure", { className: "px-4 pt-4", children: (0, jsx_runtime_1.jsx)("img", { src: post.image, className: "" }) })), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center px-4 py-2", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-teal-500" : "text-white"}`, onClick: () => {
                                        handleclick(1);
                                    } }), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `Votes (${votes})` }), " ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => {
                                        handleclick(-1);
                                    } })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: `comments_${post.id}`, className: "flex gap-2 items-center", onClick: () => (document.body.style.overflow = "hidden"), children: [(0, jsx_runtime_1.jsx)(bi_1.BiCommentDetail, {}), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `Comments (${post.comment_ids.length})` })] }), (0, jsx_runtime_1.jsx)(bi_1.BiShareAlt, {}), (0, jsx_runtime_1.jsx)(bi_1.BiStar, { className: "ml-auto" })] })] }) }));
}
exports.default = Post;
