"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function DummyCard() {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("div", { className: "card rounded-none w-96 bg-base-200 shadow-xl ", children: (0, jsx_runtime_1.jsxs)("div", { className: " bg-base-100 m-4", children: [(0, jsx_runtime_1.jsx)("figure", { className: "px-10 pt-10", children: (0, jsx_runtime_1.jsx)("img", { src: "https://www.frontlist.in/storage/post/1653642722_photo-1630343710506-89f8b9f21d31.jpg", alt: "Shoes", className: "rounded-xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "card-body items-center text-center", children: [(0, jsx_runtime_1.jsx)("h2", { className: "card-title", children: "Shoes!" }), (0, jsx_runtime_1.jsx)("p", { children: "If a dog chews shoes whose shoes does he choose?" }), (0, jsx_runtime_1.jsx)("div", { className: "card-actions", children: (0, jsx_runtime_1.jsx)("button", { className: "btn btn-primary", children: "Buy Now" }) })] })] }) }) }));
}
exports.default = DummyCard;
