"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_hook_form_1 = require("react-hook-form");
const react_query_1 = require("@tanstack/react-query");
const auth_1 = require("../../Firebase/api/auth/auth");
const react_router_1 = require("react-router");
function SignUp() {
    const { register, handleSubmit } = (0, react_hook_form_1.useForm)({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            username: "",
        },
    });
    const navigate = (0, react_router_1.useNavigate)();
    // signup the user using firebase auth
    const { mutate, data: authData, error, isLoading, isError, } = (0, react_query_1.useMutation)({
        mutationFn: auth_1.signup,
        mutationKey: ["currentUser"],
        onSuccess: async (data) => {
            console.log("auth data from firebase", data);
            await (0, auth_1.getCurrentUser)();
            // navigate("/login");
        },
    });
    // add user to users collection
    async function submitHandler(userData) {
        console.log("user data from submit handler", userData);
        mutate(userData);
    }
    // TODO: make password type password
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative bg-base-200 h-[100vh] w-full flex flex-col md:flex-row md:justify-end justify-center items-center py-10 md:px-0", children: [(0, jsx_runtime_1.jsx)("img", { className: "absolute contrast-125 object-cover object-left w-full h-full ", src: "https://source.unsplash.com/UsEHH1sd4rE" }), (0, jsx_runtime_1.jsxs)("div", { className: "md:w-2/5 py-6 md:mr-10 px-6 mx-6 relative z-10 backdrop-blur-sm", children: [isLoading && (0, jsx_runtime_1.jsx)("p", { children: "Loading..." }), (0, jsx_runtime_1.jsx)("h2", { className: "text-4xl md:text-5xl font-semibold mb-16 md:mb-8 md:text-center", children: "Sign Up" }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(submitHandler), className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Email", className: "input input-bordered w-full py-8 md:py-6", ...register("email", { required: true }) }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "User Name", className: "input input-bordered w-full py-8 md:py-6", ...register("username", { required: true }) }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "Password", className: "input input-bordered w-full py-8 md:py-6", ...register("password", { required: true }) }), (0, jsx_runtime_1.jsx)("input", { type: "password", placeholder: "Confirm Password", className: "input input-bordered w-full py-8 md:py-6", ...register("confirmPassword", { required: true }) }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "text-lg font-semibold bg-base-300 w-full py-5 md:py-3", children: "Sign Up" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "font-light text-center mt-10 md:mt-14", children: ["Already have an account? ", (0, jsx_runtime_1.jsx)("span", { className: "font-semibold", children: "Log In" })] })] })] }));
}
exports.default = SignUp;
