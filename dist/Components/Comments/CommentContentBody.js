"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
const DateFormatter_1 = __importDefault(require("../../Helper/DateFormatter"));
const RepliesContent_1 = __importDefault(require("./RepliesContent"));
const react_router_dom_1 = require("react-router-dom");
function CommentContentBody({ comment, }) {
    const [displayReplies, setDisplayReplies] = (0, react_1.useState)(false);
    const [upVoted, setUpvoted] = (0, react_1.useState)(false);
    const [downVoted, setDownvoted] = (0, react_1.useState)(false);
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chat chat-start my-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "chat-image avatar", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 rounded-full", children: (0, jsx_runtime_1.jsx)("img", { onClick: () => navigate(`/profile/${comment.user_id}`), src: comment.user_data?.profile_photo
                                    ? comment.user_data?.profile_photo
                                    : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: "cursor-pointer" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-header mb-2 text-sm flex", children: [(0, jsx_runtime_1.jsx)("p", { className: "cursor-pointer", onClick: () => navigate(`/profile/${comment.user_id}`), children: comment.user_data.username }), (0, jsx_runtime_1.jsx)("time", { className: "text-sm opacity-50 ml-2", children: (0, DateFormatter_1.default)(comment.created_at) })] }), (0, jsx_runtime_1.jsx)("div", { className: `px-4 py-2 rounded-tl-xl rounded-tr-xl rounded-br-xl ${comment.user_data.type === "r" ? "bg-blue-600" : "bg-yellow-500"} text-white text-sm`, children: comment.text.length < 200 ? comment.text :
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showMore ? comment.text : comment.text.slice(0, 200), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 cursor-pointer text-sm underline", onClick: () => setShowMore(!showMore), children: showMore ? "show less" : "show more" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center px-4 py-2 ml-8", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-teal-500" : "text-white"}`, onClick: () => {
                                    handleclick(1);
                                } }), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `${comment.votes}` }), " ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => {
                                    handleclick(-1);
                                } })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: `replies_${comment.id}`, className: "flex gap-2 items-center", onClick: () => {
                            setDisplayReplies(!displayReplies);
                        }, children: [(0, jsx_runtime_1.jsx)(bi_1.BiCommentDetail, {}), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `${comment.reply_ids.length}` })] })] }), displayReplies && (0, jsx_runtime_1.jsx)(RepliesContent_1.default, { commentID: comment.id })] }));
}
exports.default = CommentContentBody;
