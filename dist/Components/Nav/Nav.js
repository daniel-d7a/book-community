"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const bi_1 = require("react-icons/bi");
const react_router_dom_1 = require("react-router-dom");
function Nav() {
    const [activeIdx, setActiveIdx] = (0, react_1.useState)(1);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "btm-nav text-xl h-14 btm-nav-lg", children: [(0, jsx_runtime_1.jsx)("span", { className: `transition-all duration-150 absolute top-0 ${activeIdx === 1 ? "left-0" : activeIdx === 2 ? "left-1/4" : activeIdx === 3 ? "left-2/4" : "left-3/4"} w-1/4 h-1 bg-warning` }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: `transition-all duration-150 ${activeIdx === 1 && "text-warning"}`, onClick: () => {
                        setActiveIdx(1);
                    }, children: (0, jsx_runtime_1.jsx)(bi_1.BiHomeAlt, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/notifications", className: `transition-all duration-150 ${activeIdx === 2 && "text-warning"}`, onClick: () => {
                        setActiveIdx(2);
                    }, children: (0, jsx_runtime_1.jsx)(bi_1.BiBell, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/search", className: `transition-all duration-150 ${activeIdx === 3 && "text-warning"}`, onClick: () => {
                        setActiveIdx(3);
                    }, children: (0, jsx_runtime_1.jsx)(bi_1.BiSearch, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/profile", className: `transition-all duration-150 ${activeIdx === 4 && "text-warning"}`, onClick: () => {
                        setActiveIdx(4);
                    }, children: (0, jsx_runtime_1.jsx)(bi_1.BiUser, {}) })] }) }));
}
exports.default = Nav;
