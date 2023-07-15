"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const hi_1 = require("react-icons/hi");
const tfi_1 = require("react-icons/tfi");
const cg_1 = require("react-icons/cg");
const icon_1 = __importDefault(require("./atoms/icon"));
const react_query_1 = require("@tanstack/react-query");
const PostsApi_1 = require("../../Firebase/api/database/PostsApi");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const auth_1 = require("../../Firebase/api/auth/auth");
function CreateFeed() {
    const scheme = zod_2.z.object({
        postText: (0, zod_2.string)().min(1, { message: "post text can't be empty" }),
    });
    const { register, handleSubmit, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(scheme),
        defaultValues: {
            postText: "",
        },
    });
    const { mutate } = (0, react_query_1.useMutation)({
        mutationFn: PostsApi_1.createPost,
    });
    function submit(data) {
        console.log(auth_1.auth.currentUser);
        // console.log(errors);
        console.log(data);
        mutate({ text: data.postText });
        reset();
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-2xl mx-auto w-full flex flex-col justify-center items-center my-4 bg-base-300 p-4 gap-4", children: [(0, jsx_runtime_1.jsxs)("label", { 
                    // onFocus={(e) => (e.target.style.height = "100px")}
                    className: "h-14 focus-within:h-64 overflow-hidden focus-within:overflow-visible flex flex-wrap justify-center items-start w-full bg-base-100 ", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 ml-4 mt-2 rounded-full overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: "https://engineering.unl.edu/images/staff/Kayla-Person.jpg", className: "w-full object-cover " }) }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(submit), className: "w-10/12", children: [(0, jsx_runtime_1.jsx)("textarea", { ...register("postText"), placeholder: "Add a post", className: "focus:outline-none bg-transparent h-36 p-2 bg-base-300 m-2 resize-none transition-all w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "text-red-600", children: errors.postText?.message }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "self-end mr-2 btn mt-1 block width-full px-20 mb-4", children: "post" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "capitalize w-full flex justify-around items-center", children: [(0, jsx_runtime_1.jsx)(icon_1.default, { icon: (0, jsx_runtime_1.jsx)(hi_1.HiOutlineEmojiHappy, {}), text: "feeling", styles: "badge-info" }), (0, jsx_runtime_1.jsx)(icon_1.default, { icon: (0, jsx_runtime_1.jsx)(tfi_1.TfiLocationPin, {}), text: "location", styles: "badge-success" }), (0, jsx_runtime_1.jsx)(icon_1.default, { icon: (0, jsx_runtime_1.jsx)(cg_1.CgPoll, {}), text: "poll", styles: "badge-warning" })] })] }) }));
}
exports.default = CreateFeed;
