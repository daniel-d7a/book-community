"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const react_router_dom_3 = require("react-router-dom");
const Feed_1 = __importDefault(require("../Feed/Feed"));
const Profile_1 = __importDefault(require("../profile/Profile"));
const Nav_1 = __importDefault(require("../Nav/Nav"));
function Home() {
    const navigate = (0, react_router_dom_2.useNavigate)();
    const logOut = () => {
        window.localStorage.removeItem("currentUser");
        window.sessionStorage.removeItem("currentUser");
        navigate("/login");
    };
    if (!window.localStorage.getItem("currentUser") &&
        !window.sessionStorage.getItem("currentUser")) {
        return (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login", replace: true });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-slate-900 mb-0 overflow-hidden", children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_3.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_3.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(Feed_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_3.Route, { path: `/profile/:user_id`, element: (0, jsx_runtime_1.jsx)(Profile_1.default, {}) })] })] }));
}
exports.default = Home;
