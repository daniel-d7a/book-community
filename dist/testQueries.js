"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const PostsApi_1 = require("./Firebase/api/database/PostsApi");
const auth_1 = require("./Firebase/api/auth/auth");
function TestQueries() {
    const { data: posts, status } = (0, react_query_1.useQuery)({
        queryKey: ["posts"],
        queryFn: () => (0, PostsApi_1.getUserPosts)(auth_1.auth?.currentUser?.uid || ""),
    });
    if (status === "success") {
        console.log("user", auth_1.auth?.currentUser?.uid);
        console.log("data ", posts);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("p", { children: "data" }) }));
}
exports.default = TestQueries;
