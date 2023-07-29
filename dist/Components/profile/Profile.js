"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const auth_1 = require("../../Firebase/api/auth/auth");
const react_query_1 = require("@tanstack/react-query");
const UserApi_1 = require("../../Firebase/api/database/UserApi");
const bi_1 = require("react-icons/bi");
const CreateFeed_1 = __importDefault(require("../Feed/CreateFeed"));
const PostsApi_1 = require("../../Firebase/api/database/PostsApi");
const Post_1 = __importDefault(require("../Post/Post"));
const Nav_1 = __importDefault(require("../Nav/Nav"));
const react_1 = require("react");
function Profile() {
    const params = (0, react_router_dom_1.useParams)();
    console.log(params.user_id);
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["getUserUsingId"],
        queryFn: () => (0, UserApi_1.getUserById)(params.user_id || ""),
    });
    const { data: postsData, status: postsDataStatus } = (0, react_query_1.useQuery)({
        queryKey: ["getUserPosts"],
        queryFn: () => (0, PostsApi_1.getUserPosts)(params.user_id ? params.user_id : ""),
    });
    (0, react_1.useEffect)(() => {
        window.scrollTo(0, 0);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 min-h-screen mb-0 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "px-4 pt-20 flex flex-col", children: [status === "loading" && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full h-screen flex flex-col pt-4 items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] }) })), status === "success" && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full bg-slate-950 mb-4 max-w-lg md:mx-auto pt-20 pb-4 relative rounded-md overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: `w-full h-36 absolute top-0 z-0 left-0 ${data?.type === "r" ? "bg-blue-600" : "bg-yellow-500"}`, children: (0, jsx_runtime_1.jsx)("div", { className: `text-9xl  flex items-center ${data?.type === "w"
                                                ? "justify-start text-yellow-900"
                                                : "justify-end text-blue-900"}`, children: data?.type === "r" ? (0, jsx_runtime_1.jsx)(bi_1.BiBookReader, {}) : (0, jsx_runtime_1.jsx)(bi_1.BiEditAlt, {}) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full z-20 flex-col gap-4 relative items-center", children: [(0, jsx_runtime_1.jsx)("img", { src: data?.profile_photo, className: "w-28 h-28 rounded-full object-cover border-white border-[3px]", alt: "" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold", children: data?.username }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg", children: data?.type === "r" ? "Reader" : "Writer" }), params.user_id === auth_1.auth.currentUser?.uid && ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsxs)("button", { className: "p-2 px-4 flex items-center gap-1 rounded-md bg-yellow-950 text-yellow-500 text-sm md:text-base", children: ["Edit profile", (0, jsx_runtime_1.jsx)(bi_1.BiPencil, { className: "text-xl" })] }), (0, jsx_runtime_1.jsx)("button", { className: "p-2 px-3 rounded-md text-lg flex items-center justify-center bg-slate-900", children: (0, jsx_runtime_1.jsx)(bi_1.BiDotsHorizontalRounded, { className: "text-2xl" }) })] }))] })] }), params.user_id === auth_1.auth?.currentUser?.uid && (0, jsx_runtime_1.jsx)(CreateFeed_1.default, {}), postsDataStatus === "loading" && ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] })), postsDataStatus === "success" &&
                                postsData.map((post) => post.user_data && ((0, jsx_runtime_1.jsx)(Post_1.default, { user: post.user_data, post: post }, post.id)))] }))] })] }));
}
exports.default = Profile;
