"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const CreateFeed_1 = __importDefault(require("../Feed/CreateFeed"));
const Post_1 = __importDefault(require("../Post/Post"));
const react_1 = require("react");
const auth_1 = require("../../Firebase/api/auth/auth");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const PostsApi_1 = require("../../Firebase/api/database/PostsApi");
const react_query_1 = require("@tanstack/react-query");
const Nav_1 = __importDefault(require("../Nav/Nav"));
function Home() {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const logOut = () => {
        window.localStorage.removeItem("currentUser");
        window.sessionStorage.removeItem("currentUser");
        navigate("/login");
    };
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["posts"],
        queryFn: PostsApi_1.getAllPosts,
    });
    console.log("All posts:", data);
    if (!window.localStorage.getItem("currentUser") &&
        !window.sessionStorage.getItem("currentUser")) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login", replace: true });
    }
    (0, react_1.useEffect)(() => console.log(auth_1.auth.currentUser), []);
    if (status === "loading")
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (status === "success")
        return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900", children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "px-4", children: [(0, jsx_runtime_1.jsx)(CreateFeed_1.default, {}), data.map((post) => post.user_data && (0, jsx_runtime_1.jsx)(Post_1.default, { user: post.user_data, post: post }))] })] }));
}
exports.default = Home;
