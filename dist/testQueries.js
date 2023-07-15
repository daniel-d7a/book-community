"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const CommentsApi_1 = require("./Firebase/api/database/CommentsApi");
function TestQueries() {
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["test query"],
        queryFn: () => (0, CommentsApi_1.getPostComments)("LNWILmPxsx4KW2kNprLx"),
    });
    // const { mutate, status, data } = useMutation({
    //   mutationFn: ({ postId, text }: { postId: string; text: string }) =>
    //     addComment(postId, text),
    // });
    if (status === "loading")
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (status === "success") {
        console.log("data", data);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("p", { children: "data" }) }));
}
exports.default = TestQueries;
