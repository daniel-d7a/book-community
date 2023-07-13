"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
//@ts-check
const dummycard_1 = __importDefault(require("./atoms/dummycard"));
const statBox_1 = __importDefault(require("./atoms/statBox"));
const bs_1 = require("react-icons/bs");
const react_1 = require("react");
function Profile() {
    const [tab, setTab] = (0, react_1.useState)(0);
    const user_items = (0, react_1.useRef)(null);
    function scrollUserItems() {
        //@ts-ignore
        user_items.current.scrollTo({
            top: 0,
            left: tab * 400,
            behavior: "smooth",
        });
    }
    (0, react_1.useEffect)(() => {
        scrollUserItems();
    }, [tab]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: "relative ", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[85vh] z-0", children: (0, jsx_runtime_1.jsxs)("div", { className: "fixed", children: [(0, jsx_runtime_1.jsx)("img", { className: "absolute grayscale-[50%] z-[-1] top-0 left-0 w-full", src: "https://thumbs.dreamstime.com/b/beautiful-male-model-shoot-studio-man-professional-make-up-hair-style-89501857.jpg" }), (0, jsx_runtime_1.jsxs)("div", { className: "dropdown dropdown-end absolute top-0 right-6", children: [(0, jsx_runtime_1.jsx)("label", { tabIndex: 0, className: "m-1 text-xl", children: (0, jsx_runtime_1.jsx)(bs_1.BsThreeDots, {}) }), (0, jsx_runtime_1.jsxs)("ul", { tabIndex: 0, className: "dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Edit Profile" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { children: "Share Link" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ml-8 pt-60 flex flex-col gap-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold text-3xl", children: "Danny Douglas" }), (0, jsx_runtime_1.jsx)("p", { className: "font-thin text-gray-300 text-lg", children: "@dannie647" }), (0, jsx_runtime_1.jsx)("p", { className: "font-light text-sm capitalize text-gray-300 pr-20", children: "product designer, entrepreneur, co-founder of digital software" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-9 justify-center items-center mt-8", children: [(0, jsx_runtime_1.jsx)(statBox_1.default, { name: "posts", number: 125 }), (0, jsx_runtime_1.jsx)(statBox_1.default, { name: "photos", number: 458 }), (0, jsx_runtime_1.jsx)(statBox_1.default, { name: "followers", number: 12453 }), (0, jsx_runtime_1.jsx)(statBox_1.default, { name: "following", number: 328 })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-center items-center mt-8 gap-4", children: [(0, jsx_runtime_1.jsx)("button", { className: "bg-gradient-to-tr font-bold from-red-600 to-red-500 w-2/5 py-1 rounded-md", children: "Follow" }), (0, jsx_runtime_1.jsx)("button", { className: "bg-white text-black font-bold w-2/5 py-1 rounded-md", children: "Message" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex relative mt-8 ml-8 gap-4 capitalize justify-start", children: [(0, jsx_runtime_1.jsx)("span", { className: `absolute transition-all bg-red-600 w-5 h-1 bottom-[-2px] ${tab === 0
                                            ? "left-[-1px]"
                                            : tab === 1
                                                ? "left-[57px]"
                                                : "left-[126px]"}` }), (0, jsx_runtime_1.jsx)("p", { onClick: () => setTab(0), children: "posts" }), (0, jsx_runtime_1.jsx)("p", { onClick: () => setTab(1), children: "photos" }), (0, jsx_runtime_1.jsx)("p", { onClick: () => setTab(2), children: "videos" })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { ref: user_items, className: "flex overflow-scroll snap-x", children: [(0, jsx_runtime_1.jsxs)("div", { className: "snap-start snap-mandatory", children: [(0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "snap-start snap-mandatory", children: [(0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {})] }), (0, jsx_runtime_1.jsxs)("div", { className: "snap-start snap-mandatory", children: [(0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {}), (0, jsx_runtime_1.jsx)(dummycard_1.default, {})] })] })] }) }));
}
exports.default = Profile;
