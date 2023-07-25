"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const react_query_1 = require("@tanstack/react-query");
const PostsApi_1 = require("../../Firebase/api/database/PostsApi");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const auth_1 = require("../../Firebase/api/auth/auth");
const bi_1 = require("react-icons/bi");
const UserApi_1 = require("../../Firebase/api/database/UserApi");
function CreateFeed() {
    const scheme = zod_2.z.object({
        postText: (0, zod_2.string)().min(1, { message: "post text can't be empty" }),
    });
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["getUserWithId"],
        queryFn: () => (0, UserApi_1.getUserById)(auth_1.auth.currentUser?.uid),
    });
    const { register, handleSubmit, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(scheme),
        defaultValues: {
            postText: "",
        },
    });
    const queryClient = (0, react_query_1.useQueryClient)();
    const { mutate } = (0, react_query_1.useMutation)({
        mutationFn: PostsApi_1.createPost,
        onSuccess: async () => {
            const updatedPosts = await queryClient.fetchQuery(["posts"]);
            queryClient.setQueryData(["posts"], updatedPosts);
        },
    });
    function submit(data) {
        console.log(auth_1.auth.currentUser);
        console.log(data);
        mutate({ text: data.postText });
        reset();
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl mx-auto w-full max-w-lg bg-slate-950 h-fit mt-2 mb-6 rounded-md px-3 py-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full overflow-hidden shrink-0", children: (0, jsx_runtime_1.jsx)("img", { src: data?.profile_photo
                                ? data?.profile_photo
                                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: "w-full object-cover " }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full mb-4", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(submit), className: "w-full", children: [(0, jsx_runtime_1.jsx)("textarea", { ...register("postText"), placeholder: "Add a post", className: "focus:outline-none bg-slate-900 max-h-64 p-2 rounded-md h-28 resize-none transition-all w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "text-red-600", children: errors.postText?.message }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "bg-yellow-500 px-8 py-2 mt-2 rounded-md", children: "post" })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(bi_1.BiImage, { className: "text-green-600" }), "Photo"] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(bi_1.BiVideo, { className: "text-blue-600" }), "Video"] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(bi_1.BiCalendar, { className: "text-red-600" }), "Event"] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(hi_1.HiEmojiHappy, { className: "text-yellow-500" }), "Feeling /Activity"] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: "..." })] })] }));
}
exports.default = CreateFeed;
