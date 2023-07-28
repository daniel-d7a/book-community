"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const zod_1 = require("zod");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("@hookform/resolvers/zod");
const react_query_1 = require("@tanstack/react-query");
const RepliesApi_1 = require("../../Firebase/api/database/RepliesApi");
const UserApi_1 = require("../../Firebase/api/database/UserApi");
const auth_1 = require("../../Firebase/api/auth/auth");
const bs_1 = require("react-icons/bs");
const ReplyContentBody_1 = __importDefault(require("./ReplyContentBody"));
const react_router_dom_1 = require("react-router-dom");
function RepliesContent({ commentID }) {
    const scheme = zod_1.z.object({
        replyText: (0, zod_1.string)().min(1, { message: "comment text can't be empty" }),
    });
    const { register, handleSubmit, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(scheme),
        defaultValues: {
            replyText: "",
        },
    });
    const queryClient = (0, react_query_1.useQueryClient)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { mutate, isLoading } = (0, react_query_1.useMutation)({
        mutationFn: ({ id, text }) => (0, RepliesApi_1.addReply)(id, text),
        onSuccess: async () => {
            const updatedComments = await queryClient.fetchQuery([
                "repliesForComm",
                commentID,
            ]);
            queryClient.setQueryData(["repliesForComm", commentID], updatedComments);
        },
    });
    const { data: userData, isSuccess } = (0, react_query_1.useQuery)({
        queryKey: ["getUserWithId"],
        queryFn: () => (0, UserApi_1.getUserById)(auth_1.auth?.currentUser?.uid),
    });
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["repliesForComm", commentID],
        queryFn: () => (0, RepliesApi_1.getCommentReplies)(commentID),
    });
    function submit(data) {
        mutate({ text: data.replyText, id: commentID });
        reset();
    }
    if (status === "loading") {
        return ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "px-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2 mt-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full overflow-hidden shrink-0", children: (0, jsx_runtime_1.jsx)("img", { onClick: () => navigate(`/profile/${auth_1.auth.currentUser?.uid}`), src: isSuccess
                                ? userData?.profile_photo
                                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: "w-12 h-12 rounded-full object-cover" }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(submit), className: "w-full bg-slate-900 h-10 rounded-md flex", children: [(0, jsx_runtime_1.jsx)("textarea", { ...register("replyText"), placeholder: "Add a reply", className: "focus:outline-none bg-transparent  max-h-64 p-2 pl-3 rounded-md h-10 resize-none transition-all w-full" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "mr-3 text-xl text-yellow-500", children: (0, jsx_runtime_1.jsx)(bs_1.BsSendFill, {}) })] })] }), isLoading && ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full mt-4 flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] })), data?.length && data?.length > 0 ? (data?.map((item) => ((0, jsx_runtime_1.jsx)(ReplyContentBody_1.default, { reply: item }, item?.comment_id)))) : ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-center mt-2", children: (0, jsx_runtime_1.jsx)("p", { className: "mx-auto", children: "no replies yet" }) }))] }));
}
exports.default = RepliesContent;