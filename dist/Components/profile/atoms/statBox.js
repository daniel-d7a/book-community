"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// import { z } from "zod";
//@ts-ignore
function StatBox({ number, name }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "capitalize text-sm", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold", children: Intl.NumberFormat("en-US", {
                    notation: "compact",
                    maximumFractionDigits: 1,
                }).format(number) }), (0, jsx_runtime_1.jsx)("p", { className: "font-light", children: name })] }));
}
exports.default = StatBox;
