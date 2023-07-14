"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ai_1 = require("react-icons/ai");
const react_query_1 = require("@tanstack/react-query");
const react_router_1 = require("react-router");
const auth_js_1 = require("../../Firebase/api/auth/auth.js");
const react_hook_form_1 = require("react-hook-form");
const zod_1 = require("@hookform/resolvers/zod");
const zod_2 = require("zod");
const scheme = zod_2.z.object({
    email: (0, zod_2.string)().email({ message: "Invalid email address" }),
    password: (0, zod_2.string)().min(6, { message: "Password is too short" }),
});
function Login() {
    const { register, handleSubmit, formState } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(scheme),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [wrongData, setWrongData] = (0, react_1.useState)(false);
    const { errors } = formState;
    const [check, setCheck] = (0, react_1.useState)(false);
    const timer = (0, react_1.useRef)();
    const navigate = (0, react_router_1.useNavigate)();
    function submit(d) {
        const data = { ...d, rememberMe: check };
        // console.log(data)
        mutate(data);
    }
    const { mutate } = (0, react_query_1.useMutation)({
        mutationFn: auth_js_1.login,
        onSuccess: () => {
            navigate("/");
        },
        onError: (error) => {
            console.log({ ...error });
            if (error.code === "auth/user-not-found" ||
                error.code === "auth/wrong-password") {
                setWrongData(true);
                timer.current = window.setTimeout(() => {
                    setWrongData(false);
                }, 3000);
            }
        },
    });
    (0, react_1.useEffect)(() => {
        if (window.localStorage.getItem("currentUser")) {
            console.log(JSON.parse(window.localStorage.getItem("currentUser")).user.uid);
            navigate("/");
        }
        return () => {
            clearTimeout(timer.current);
        };
    }, [timer]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative bg-base-200 h-[100vh] w-full flex flex-col md:flex-row md:justify-end justify-center items-center py-10 md:px-0", children: [(0, jsx_runtime_1.jsx)("img", { className: "absolute contrast-125 object-cover object-left w-full h-full ", src: "https://source.unsplash.com/UsEHH1sd4rE" }), (0, jsx_runtime_1.jsxs)("div", { className: "md:w-2/5 py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-4xl md:text-5xl font-semibold mb-16 md:mb-8 md:text-center", children: "Log In" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(submit), className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Email", className: "input input-bordered w-full py-8 md:py-6", ...register("email") }), (0, jsx_runtime_1.jsx)("div", { className: "text-red-600", children: String(errors.email?.message) }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "Password", className: "input input-bordered w-full py-8 md:py-6", ...register("password") }), (0, jsx_runtime_1.jsx)("div", { className: "text-red-600", children: String(errors.password?.message) }), (0, jsx_runtime_1.jsx)("div", { className: "form-control", children: (0, jsx_runtime_1.jsxs)("label", { className: "cursor-pointer label", children: [(0, jsx_runtime_1.jsx)("span", { className: "label-text", children: "Remember me" }), (0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: check, onClick: () => {
                                                setCheck(!check);
                                            }, className: "checkbox checkbox-sm checkbox-warning" })] }) }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "text-lg font-semibold bg-base-300 w-full py-5 md:py-3", children: "Log In" }), (0, jsx_runtime_1.jsxs)("div", { className: `alert alert-error my-4 rounded-none h-12 ${!wrongData ? "hidden" : ""}`, children: [(0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "stroke-current shrink-0 h-6 w-6", fill: "none", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" }) }), (0, jsx_runtime_1.jsx)("span", { children: "Wrong email or password" })] }), (0, jsx_runtime_1.jsx)("p", { className: "text-center font-light", children: "or sign up with" }), (0, jsx_runtime_1.jsx)("button", { className: "text-lg flex justify-center font-semibold bg-base-300 w-full py-3.5 md:py-3", children: (0, jsx_runtime_1.jsx)(ai_1.AiOutlineGoogle, { className: "text-4xl md:text-3xl" }) })] }), (0, jsx_runtime_1.jsxs)("p", { className: "font-light text-center mt-10 md:mt-14", children: ["Don't have an account? ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Sign Up" })] })] })] }));
}
exports.default = Login;
