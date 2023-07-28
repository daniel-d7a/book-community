"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const tfi_1 = require("react-icons/tfi");
const react_1 = require("react");
const DateFormatter_1 = __importDefault(require("../../Helper/DateFormatter"));
const bi_1 = require("react-icons/bi");
const react_query_1 = require("@tanstack/react-query");
const react_router_dom_1 = require("react-router-dom");
const CommentsContent_1 = __importDefault(require("../Comments/CommentsContent"));
const PostsApi_1 = require("../../Firebase/api/database/PostsApi");
const auth_1 = require("../../Firebase/api/auth/auth");
const PhotoGrid_1 = __importDefault(require("./atoms/PhotoGrid"));
function Post({ user, post }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const [showMore, setShowMore] = (0, react_1.useState)(false);
    const [displayComms, setDisplayComms] = (0, react_1.useState)(false);
    const [deleteClicked, setDeleteClicked] = (0, react_1.useState)(false);
    const { mutate } = (0, react_query_1.useMutation)({
        mutationFn: ({ id, vote }) => (0, PostsApi_1.votePost)(id, vote),
    });
    const { mutate: deletePostMutate, isLoading } = (0, react_query_1.useMutation)({
        mutationFn: () => (0, PostsApi_1.deletePostById)(post.id),
        onSuccess: async () => {
            const updatedPosts = await queryClient.fetchQuery([
                `${window.location.pathname === "/" ? "posts" : "getUserPosts"}`,
            ]);
            queryClient.setQueryData([`${window.location.pathname === "/" ? "posts" : "getUserPosts"}`], updatedPosts);
        },
    });
    const [votes, setVotes] = (0, react_1.useState)(post.votes);
    const [upVoted, setUpvoted] = (0, react_1.useState)(false);
    const [downVoted, setDownvoted] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const currentlyVoted = post.voter_ids.find((x) => x.id === auth_1.auth?.currentUser?.uid);
        if (currentlyVoted) {
            if (currentlyVoted.vote === "up") {
                setUpvoted(true);
            }
            else {
                setDownvoted(true);
            }
        }
    }, []);
    function handleclick(amount) {
        if (amount === 1) {
            mutate({ id: post.id, vote: "up" });
        }
        else {
            mutate({ id: post.id, vote: "down" });
        }
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [deleteClicked && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-center  px-2 h-screen z-50 bg-black bg-opacity-50 fixed top-0 left-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-lg flex flex-col gap-8 items-center opacity-100 py-8 bg-slate-900 rounded-md px-4 ", children: [(0, jsx_runtime_1.jsx)("p", { children: "Are you sure you want to delete this post? if you delete it, you won't be able to get it back" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)("button", { onClick: (e) => {
                                        deletePostMutate();
                                        setDeleteClicked(false);
                                        e.target.disabled = true;
                                    }, className: "p-2 px-4 rounded-md bg-yellow-950 text-yellow-500 text-sm md:text-base", children: isLoading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-500", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] })) : ("Delete") }), (0, jsx_runtime_1.jsx)("button", { className: "p-2 px-4 rounded-md text-red-500 bg-red-950 bg-opacity-50 text-sm md:text-base", onClick: () => setDeleteClicked(false), children: "Cancel" })] })] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "rounded-md pb-4 bg-slate-950 w-full max-w-lg mx-auto w-fullshadow-xl mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center pt-4 pl-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("img", { onClick: () => navigate(`/profile/${post.user_id}`), src: user && user.profile_photo
                                            ? user.profile_photo
                                            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: " w-12 h-12 rounded-full object-cover cursor-pointer" }), (0, jsx_runtime_1.jsx)("div", { className: `absolute bottom-0 right-0 w-5 h-5 rounded-full ${user.type === "r" ? "bg-blue-600" : "bg-yellow-500"}  text-black border-2 border-base-100 flex items-center justify-center text-[14px]`, children: user.type === "r" ? (0, jsx_runtime_1.jsx)(bi_1.BiBookReader, {}) : (0, jsx_runtime_1.jsx)(bi_1.BiEditAlt, {}) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "text-sm", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: `/profile/${post.user_id}`, className: "text-lg font-bold cursor-pointer", children: user.username || "user" }), post.community && "/", (0, jsx_runtime_1.jsx)("a", { href: "#", children: post.community && post.community.length > 15
                                            ? /* @ts-ignore */
                                                post.community.substring(0, 15) + "..."
                                            : /* @ts-ignore */
                                                post.community }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 text-base text-zinc-400", children: [(0, jsx_runtime_1.jsx)("p", { children: (0, DateFormatter_1.default)(post.created_at) }), post.location && ((0, jsx_runtime_1.jsxs)("a", { href: "#", className: "flex gap-1 items-center", children: [(0, jsx_runtime_1.jsx)(tfi_1.TfiLocationPin, {}), " ", post.location] }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: `dropdown dropdown-end ml-auto mr-4 ${deleteClicked && "hidden"}`, children: [(0, jsx_runtime_1.jsx)("label", { tabIndex: 0, className: "cursor-pointer", children: (0, jsx_runtime_1.jsx)(bi_1.BiDotsHorizontalRounded, { className: "text-2xl" }) }), (0, jsx_runtime_1.jsxs)("ul", { tabIndex: 0, className: "dropdown-content menu p-2 shadow rounded-box w-52 bg-slate-950", children: [post.user_id === auth_1.auth.currentUser?.uid && ((0, jsx_runtime_1.jsx)("li", { onClick: () => setDeleteClicked(true), children: (0, jsx_runtime_1.jsx)("a", { children: "Delete" }) })), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Hide" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Report" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Copy link" }) })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-4", children: (0, jsx_runtime_1.jsx)("p", { children: post.text.length < 200 ? (post.text) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [showMore ? post.text : post.text.slice(0, 200), (0, jsx_runtime_1.jsx)("span", { className: "ml-1 cursor-pointer underline", onClick: () => setShowMore(!showMore), children: showMore ? "show less" : "show more" })] })) }) }), !isLoading && (0, jsx_runtime_1.jsx)(PhotoGrid_1.default, { images: post.images }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4 items-center px-4 py-2", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex gap-2 items-center", children: [(0, jsx_runtime_1.jsx)(bi_1.BiUpvote, { className: `${upVoted ? "text-blue-600" : "text-white"}`, onClick: () => {
                                            handleclick(1);
                                        } }), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `Votes (${votes})` }), " ", (0, jsx_runtime_1.jsx)(bi_1.BiDownvote, { className: `${downVoted ? "text-yellow-500" : "text-white"}`, onClick: () => {
                                            handleclick(-1);
                                        } })] }), (0, jsx_runtime_1.jsxs)("label", { htmlFor: `comments_${post.id}`, className: "flex gap-2 items-center", onClick: () => {
                                    setDisplayComms(!displayComms);
                                }, children: [(0, jsx_runtime_1.jsx)(bi_1.BiCommentDetail, {}), " ", (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: `Comments (${post.comment_ids.length})` })] }), (0, jsx_runtime_1.jsx)(bi_1.BiShareAlt, {}), (0, jsx_runtime_1.jsx)(bi_1.BiStar, { className: "ml-auto" })] }), displayComms && (0, jsx_runtime_1.jsx)(CommentsContent_1.default, { postID: post.id })] })] }));
}
exports.default = Post;
