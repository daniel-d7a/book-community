"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
function CommentContentBody({ comment, }) {
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
        }
        else if (upVoted && amount === 1) {
            setUpvoted(false);
        }
        else if (upVoted && amount === -1) {
            setUpvoted(false);
            setDownvoted(true);
        }
        else if (downVoted && amount === -1) {
            setDownvoted(false);
        }
        else if (downVoted && amount === 1) {
            setUpvoted(true);
            setDownvoted(false);
        }
    }
    function getDate(timestamp) {
        const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
        const date = new Date(milliseconds); // Create a new Date object from the milliseconds
        const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad it with a leading zero if necessary
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (Note: January is 0) and pad it with a leading zero if necessary
        const year = date.getFullYear().toString(); // Get the full year
        const formattedDate = `${day}/${month}/${year}`; // Combine the day, month, and year to get the formatted date
        return formattedDate;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chat chat-start my-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "chat-image avatar", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 rounded-full", children: (0, jsx_runtime_1.jsx)("img", { src: comment.user_data?.profile_photo
                                    ? comment.user_data?.profile_photo
                                    : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-header mb-2 text-base", children: [comment.user_data.username, (0, jsx_runtime_1.jsx)("time", { className: "text-sm opacity-50 ml-2", children: getDate(comment.created_at) })] }), (0, jsx_runtime_1.jsx)("div", { className: `chat-bubble ${comment.user_data.type === "r" ? "bg-blue-600" : "bg-yellow-500"} text-white text-lg`, children: comment.text })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center px-4 py-2 ml-8", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-teal-500" : "text-white"}`, onClick: () => {
                                    handleclick(1);
                                } }), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `${comment.votes}` }), " ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => {
                                    handleclick(-1);
                                } })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: ``, className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiCommentDetail, {}), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `0` })] })] })] }));
}
exports.default = CommentContentBody;
