"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const zod_1 = require("zod");
//TODO: check time value
const singleNotificationPropsSchema = zod_1.z.object({
    image: zod_1.z.string(),
    person: zod_1.z.string(),
    action: zod_1.z.string(),
    text: zod_1.z.string(),
    time: zod_1.z.tuple([zod_1.z.number(), zod_1.z.any()]),
});
function SingleNotification({ image, person, action, text, time, }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex px-6 gap-4 justify-start items-start", children: [(0, jsx_runtime_1.jsx)("div", { className: "avatar", children: (0, jsx_runtime_1.jsx)("div", { className: "w-12 md:w-16 rounded-full", children: (0, jsx_runtime_1.jsx)("img", { src: image }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "md:text-lg md:mt-2", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-white", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-semibold mr-1", children: person }), (0, jsx_runtime_1.jsx)("span", { children: action }), ":", text !== "" && (0, jsx_runtime_1.jsxs)("span", { className: "mx-1", children: ["\"", text, "\""] })] }), (0, jsx_runtime_1.jsx)("p", { className: "font-light text-gray-300 text-sm", children: new Intl.RelativeTimeFormat("en", { style: "short" }).format(...time) })] })] }) }));
}
exports.default = SingleNotification;
