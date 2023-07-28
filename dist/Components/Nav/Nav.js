"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
const tfi_1 = require("react-icons/tfi");
const react_router_dom_1 = require("react-router-dom");
const auth_1 = require("../../Firebase/api/auth/auth");
const react_query_1 = require("@tanstack/react-query");
const UserApi_1 = require("../../Firebase/api/database/UserApi");
function Nav() {
    const [selectedImage, setSelectedImage] = (0, react_1.useState)("");
    const inputFile = (0, react_1.useRef)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [changeProfile, setChangeProfile] = (0, react_1.useState)(false);
    const [tools, setTools] = (0, react_1.useState)(false);
    const onFileSelected = (event) => {
        const file = event?.target?.files?.[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };
    const onButtonClick = () => {
        inputFile.current?.click();
    };
    const { mutate, isLoading } = (0, react_query_1.useMutation)({
        mutationFn: () => (0, UserApi_1.uploadUserProfilePhoto)(auth_1.auth?.currentUser?.uid, inputFile?.current?.files?.[0]),
        onSuccess: async () => {
            console.log("changed successfully");
            location.reload();
        },
    });
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["getUserWithId"],
        queryFn: () => (0, UserApi_1.getUserById)(auth_1.auth?.currentUser?.uid),
    });
    const logOut = () => {
        window.localStorage.removeItem("currentUser");
        window.sessionStorage.removeItem("currentUser");
        navigate("/login");
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [inputFile.current?.value && ((0, jsx_runtime_1.jsx)("div", { className: "w-full flex items-center justify-center  px-2 h-screen z-50 bg-black bg-opacity-50 fixed top-0 left-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-lg flex flex-col gap-8 items-center opacity-100 py-8 bg-slate-900 rounded-md px-4", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-yellow-500 flex items-start gap-2", children: "Warning: you're about to Change your profile picture" }), (0, jsx_runtime_1.jsx)("img", { src: selectedImage, className: " w-40 h-40 rounded-full object-cover" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)("button", { className: "p-2 px-4 rounded-md bg-yellow-500 text-sm md:text-base", onClick: (e) => {
                                        mutate();
                                        e.target.disabled = true;
                                    }, children: isLoading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-full flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-white", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] })) : ("Save") }), (0, jsx_runtime_1.jsx)("button", { className: "p-2 px-4 rounded-md bg-yellow-950 text-yellow-500 text-sm md:text-base", onClick: onButtonClick, children: "Select other photo" }), (0, jsx_runtime_1.jsx)("button", { className: "p-2 px-4 rounded-md text-red-500 bg-red-950 bg-opacity-50 text-sm md:text-base", onClick: () => {
                                        inputFile.current.value = "";
                                        setSelectedImage("");
                                    }, children: "Cancel" })] })] }) })), (0, jsx_runtime_1.jsxs)("div", { className: "navbar justify-between bg-slate-950 fixed top-0 mb-4 z-30", children: [(0, jsx_runtime_1.jsx)("div", { onClick: () => navigate("/"), className: "w-9 h-9 flex items-center justify-center text-lg font-bold rounded-sm bg-yellow-500", children: (0, jsx_runtime_1.jsx)(bi_1.BiBookOpen, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-none", children: (0, jsx_runtime_1.jsxs)("ul", { className: "menu menu-horizontal px-1 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900", children: (0, jsx_runtime_1.jsx)(bi_1.BiMenu, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900", children: (0, jsx_runtime_1.jsx)(bi_1.BiChat, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900", children: (0, jsx_runtime_1.jsx)(tfi_1.TfiSettings, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900", children: (0, jsx_runtime_1.jsx)(bi_1.BiBell, {}) }), status === "loading" && (0, jsx_runtime_1.jsxs)("div", { role: "status", className: "w-9 flex flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("svg", { "aria-hidden": "true", className: "inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-500", viewBox: "0 0 100 101", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("path", { d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", fill: "currentColor" }), (0, jsx_runtime_1.jsx)("path", { d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", fill: "currentFill" })] }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Loading..." })] }), status === "success" && (0, jsx_runtime_1.jsx)("div", { onClick: () => setTools(!tools), className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900 overflow-hidden", children: (0, jsx_runtime_1.jsx)("img", { src: data?.profile_photo
                                            ? data?.profile_photo
                                            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" }) }), (0, jsx_runtime_1.jsx)("div", { className: `absolute top-14 right-3 w-60 p-4 bg-slate-950 rounded-md ${tools ? "" : "invisible"}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)("img", { onClick: () => setChangeProfile(!changeProfile), src: data?.profile_photo
                                                            ? data?.profile_photo
                                                            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg", className: " w-12 h-12 rounded-full object-cover cursor-pointer" }), changeProfile && ((0, jsx_runtime_1.jsx)("button", { onClick: onButtonClick, className: "z-40 absolute top-12 left-8 rounded-md bg-slate-950 p-2 text-sm md:text-base", children: "Change profile picture" })), (0, jsx_runtime_1.jsx)("input", { onChange: onFileSelected, type: "file", id: "file", ref: inputFile, accept: "image/png, image/jpeg", style: { display: "none" } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold", children: data?.username }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-400", children: data?.type === "r" ? "Reader" : "Writer" })] })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => navigate(`/profile/${auth_1.auth.currentUser?.uid}`), className: "w-full flex items-center justify-center py-2 text-sm bg-yellow-950 text-yellow-500", children: "View profile" }), (0, jsx_runtime_1.jsxs)("button", { onClick: logOut, className: "w-full flex items-center p-4 ", children: [(0, jsx_runtime_1.jsx)(bi_1.BiPowerOff, {}), (0, jsx_runtime_1.jsx)("span", { className: "ml-2", children: "Sign Out" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900", children: (0, jsx_runtime_1.jsx)(bi_1.BiSun, {}) }), (0, jsx_runtime_1.jsx)("div", { className: "w-9 h-9 flex items-center justify-center rounded-sm text-lg bg-slate-900", children: (0, jsx_runtime_1.jsx)(bi_1.BiMoon, {}) })] })] }) })] }) })] })] }));
}
exports.default = Nav;
