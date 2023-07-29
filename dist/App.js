"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Home_1 = __importDefault(require("./Components/Home/Home"));
const react_router_dom_1 = require("react-router-dom");
const signup_1 = __importDefault(require("./Components/Signup/signup"));
const login_1 = __importDefault(require("./Components/Login/login"));
const testQueries_1 = __importDefault(require("./testQueries"));
const Profile_1 = __importDefault(require("./Components/profile/Profile"));
const restricted_paths = ["/login", "/signup"];
function App() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "mb-0 overflow-hidden", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(signup_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/test", element: (0, jsx_runtime_1.jsx)(testQueries_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: `/profile/:user_id`, Component: Profile_1.default })] }) }) }));
}
exports.default = App;
