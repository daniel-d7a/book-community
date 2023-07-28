"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const DateFormatter_1 = __importDefault(require("../../Helper/DateFormatter"));
const bi_1 = require("react-icons/bi");
const react_router_dom_1 = require("react-router-dom");
function ReplyContentBody({ reply, }) {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "", children: [(0, jsx_runtime_1.jsxs)("div", { className: "chat chat-end my-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "chat-image avatar", children: (0, jsx_runtime_1.jsx)("div", { className: "w-10 rounded-full", children: (0, jsx_runtime_1.jsx)("img", { className: "cursor-pointer", onClick: () => navigate(`/profile/${reply.user_id}`), src: reply.user_data?.profile_photo
                                    ? reply.user_data?.profile_photo
                                    : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "chat-header mb-2 text-xs", children: [(0, jsx_runtime_1.jsx)("p", { className: "cursor-pointer", onClick: () => navigate(`/profile/${reply.user_id}`), children: reply.user_data.username }), (0, jsx_runtime_1.jsx)("time", { className: "text-xs opacity-50 ml-2", children: (0, DateFormatter_1.default)(reply.created_at) })] }), (0, jsx_runtime_1.jsx)("div", { className: `px-4 py-2 rounded-tl-xl rounded-bl-xl rounded-tr-xl ${reply.user_data.type === "r" ? "bg-blue-600" : "bg-yellow-500"} text-white text-sm`, children: reply.text.length < 200 ? reply.text :
                            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showMore ? reply.text : reply.text.slice(0, 200), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 cursor-pointer text-sm underline", onClick: () => setShowMore(!showMore), children: showMore ? "show less" : "show more" })] }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-end gap-4 items-center px-4 py-2 mr-8", children: (0, jsx_runtime_1.jsxs)("p", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-teal-500" : "text-white"}`, onClick: () => {
                                handleclick(1);
                            } }), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `0` }), " ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => {
                                handleclick(-1);
                            } })] }) })] }));
}
exports.default = ReplyContentBody;
