"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function PhotoGrid({ images }) {
    console.log("photo grid images", images);
    if (!images)
        return null;
    function imageStyles(index) {
        if (index === 0 && images.length === 1) {
            return "col-span-2 row-span-6";
        }
        else if (index === 0) {
            return "col-span-1 row-span-6";
        }
        if (images.length === 2) {
            return "col-span-1 row-span-6 col-start-2 row-start-1";
        }
        else if (images.length === 3) {
            switch (index) {
                case 1:
                    return "col-span-1 row-span-3 col-start-2 row-start-1";
                case 2:
                    return "col-span-1 row-span-3 col-start-2 row-start-4";
            }
        }
        else if (images.length >= 4) {
            switch (index) {
                case 1:
                    return "col-span-1 row-span-2 col-start-2 row-start-1";
                case 2:
                    return "col-span-1 row-span-2 col-start-2 row-start-3";
                case 3:
                    return "col-span-1 row-span-2 col-start-2 row-start-5";
            }
        }
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: " px-2 mb-3 grid grid-cols-2 grid-rows-6 gap-2 h-[400px] relative", children: [images.slice(0, 4).map((image, index) => ((0, jsx_runtime_1.jsx)("div", { className: `${imageStyles(index)}`, children: (0, jsx_runtime_1.jsx)("img", { src: image, className: `object-cover w-full h-full` }) }, image))), images.length > 4 && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center bottom-0 right-0 justify-center absolute w-1/2 h-1/3 bg-slate-800 bg-opacity-30", children: [" ", "+ ", images.length - 4] }))] }) }));
}
exports.default = PhotoGrid;
