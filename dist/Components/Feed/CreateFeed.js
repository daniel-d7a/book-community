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
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const react_dropzone_1 = require("react-dropzone");
//@ts-ignore
const images_module_css_1 = require("./images.module.css");
function CreateFeed() {
    const scheme = zod_2.z.object({
        postText: (0, zod_2.string)().min(1, { message: "post text can't be empty" }),
    });
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["getUserWithId"],
        queryFn: () => (0, UserApi_1.getUserById)(auth_1.auth?.currentUser?.uid || ""),
        enabled: false,
    });
    const { register, handleSubmit, formState: { errors }, reset, } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(scheme),
        defaultValues: {
            postText: "",
        },
    });
    const queryClient = (0, react_query_1.useQueryClient)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { mutate, isLoading } = (0, react_query_1.useMutation)({
        mutationFn: PostsApi_1.createPost,
        onSuccess: async () => {
            const updatedPosts = await queryClient.fetchQuery([
                `${window.location.pathname === "/" ? "posts" : "getUserPosts"}`,
            ]);
            queryClient.setQueryData([`${window.location.pathname === "/" ? "posts" : "getUserPosts"}`], updatedPosts);
        },
    });
    const [images, setImages] = (0, react_1.useState)([]);
    const { getRootProps, getInputProps, isDragActive, isFocused } = (0, react_dropzone_1.useDropzone)({
        accept: {
            "image/*": [".jpeg", ".png"],
        },
        onDrop: (0, react_1.useCallback)((acceptedFiles) => {
            // Do something with the files
            console.log(acceptedFiles);
            setImages((files) => [...files, ...acceptedFiles]);
        }, []),
        multiple: true,
    });
    function submit(data) {
        mutate({ text: data.postText, images });
        setImages([]);
        reset();
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "mx-auto w-full max-w-lg bg-slate-950 h-fit mt-2 mb-6 rounded-md px-3 py-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-10 h-10 rounded-full overflow-hidden shrink-0", children: (0, jsx_runtime_1.jsx)("img", { onClick: () => navigate(`/profile/${auth_1.auth.currentUser?.uid}`), src: data?.profile_photo
                                ? data?.profile_photo
                                : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: "w-12 h-12 rounded-full object-cover cursor-pointer" }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full mb-4", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(submit), className: "w-full", children: [(0, jsx_runtime_1.jsx)("textarea", { ...register("postText"), placeholder: "Add a post", className: "focus:outline-none bg-slate-900 max-h-64 p-2 rounded-md h-28 resize-none transition-all w-full" }), (0, jsx_runtime_1.jsx)("div", { className: "text-red-600", children: errors.postText?.message }), (0, jsx_runtime_1.jsxs)("div", { ...getRootProps({
                                        className: `cursor-pointer bg-slate-900 p-2 rounded-md h-16 text-center 
                  flex justify-center items-center text-gray-700 transition-all
                  ${isDragActive ? "border-2" : ""}
                  ${data?.type === "w" ? "border-yellow-500" : "border-blue-600"}`,
                                    }), children: [(0, jsx_runtime_1.jsx)("input", { ...getInputProps() }), isDragActive ? ((0, jsx_runtime_1.jsx)("p", { children: "Release to Drop ..." })) : ((0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("span", { className: "text-gray-400", children: "Drag 'n' drop" }), " some files here", (0, jsx_runtime_1.jsx)("br", {}), "or ", (0, jsx_runtime_1.jsx)("span", { className: "text-gray-400", children: "click" }), " to select files"] }))] }), images.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: ` ${images_module_css_1.slider} flex justify-center items-center overflow-x-scroll`, style: {
                                        scrollbarColor: "red",
                                    }, children: images.map((image) => ((0, jsx_runtime_1.jsx)("img", { style: {
                                            height: "100px",
                                            width: "auto",
                                        }, src: URL.createObjectURL(image) }, image.name))) })), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "bg-yellow-500 px-8 py-2 mt-2 rounded-md", children: isLoading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] })) : ("Post") })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(bi_1.BiImage, { className: "text-green-600" }), "Photo"] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(bi_1.BiVideo, { className: "text-blue-600" }), "Video"] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(bi_1.BiCalendar, { className: "text-red-600" }), "Event"] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: [(0, jsx_runtime_1.jsx)(hi_1.HiEmojiHappy, { className: "text-yellow-500" }), "Feeling /Activity"] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-slate-900 px-2 py-1 rounded-md flex items-center gap-1 text-gray-400", children: "..." })] })] }));
}
exports.default = CreateFeed;
