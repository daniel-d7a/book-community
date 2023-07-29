"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const PostsApi_1 = require("./Firebase/api/database/PostsApi");
function TestQueries() {
    const [page, setPage] = (0, react_1.useState)(1);
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["test query", page],
        queryFn: PostsApi_1.getAllPostsPaginated,
    });
    // const fileRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    // const { mutate, status, data } = useMutation({
    //   mutationFn: ({ id, vote }: { id: string; vote: "up" | "down" }) =>
    //     voteReply(id, vote),
    // });
    if (status === "loading")
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "loading..." });
    if (status === "success") {
        console.log("data", data);
    }
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { children: "data" }), (0, jsx_runtime_1.jsx)("button", { className: "btn", onClick: () => {
                    setPage((page) => page + 1);
                    console.log(page);
                }, children: "add page" })] }));
}
exports.default = TestQueries;
