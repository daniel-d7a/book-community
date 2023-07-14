"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function Icon({ icon, text, styles = "" }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: `badge w-[30%] text-center justify-center items-center flex gap-2 p-3 ${styles}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "text-eyad text-lg", children: icon }), (0, jsx_runtime_1.jsx)("p", { className: "text-md", children: text })] }) }));
}
exports.default = Icon;
