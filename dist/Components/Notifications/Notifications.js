"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const SingleNotification_1 = __importDefault(require("./SingleNotification"));
function Notifications() {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-base-200", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center font-bold text-lg md:text-xl py-6", children: "Notifications" }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-5 md:mx-60 bg-base-300 py-6", children: [
                    {
                        image: "https://source.unsplash.com/mEZ3PoFGs_k",
                        person: "sara doe",
                        action: "reacted your post",
                        text: "ha ha",
                        time: [-5, "minute"],
                    },
                    {
                        image: "https://source.unsplash.com/AJIqZDAUD7A",
                        person: "lily butt",
                        action: "commented on your post",
                        text: "very nice",
                        time: [-3, "hour"],
                    },
                    {
                        image: "https://source.unsplash.com/KBv5dEN3QtY",
                        person: "frank morris",
                        action: "shared your post",
                        text: "",
                        time: [-1, "day"],
                    },
                    {
                        image: "https://source.unsplash.com/uyaTT9u6AvI",
                        person: "alex stone",
                        action: "reacted your photo",
                        text: "love",
                        time: [-4, "day"],
                    },
                    {
                        image: "https://source.unsplash.com/mEZ3PoFGs_k",
                        person: "sara doe",
                        action: "reacted your post",
                        text: "ha ha",
                        time: [-5, "minute"],
                    },
                    {
                        image: "https://source.unsplash.com/AJIqZDAUD7A",
                        person: "lily butt",
                        action: "commented on your post",
                        text: "very nice",
                        time: [-3, "hour"],
                    },
                    {
                        image: "https://source.unsplash.com/KBv5dEN3QtY",
                        person: "frank morris",
                        action: "shared your post",
                        text: "",
                        time: [-1, "day"],
                    },
                    {
                        image: "https://source.unsplash.com/uyaTT9u6AvI",
                        person: "alex stone",
                        action: "reacted your photo",
                        text: "love",
                        time: [-4, "day"],
                    },
                    {
                        image: "https://source.unsplash.com/mEZ3PoFGs_k",
                        person: "sara doe",
                        action: "reacted your post",
                        text: "ha ha",
                        time: [-5, "minute"],
                    },
                    {
                        image: "https://source.unsplash.com/AJIqZDAUD7A",
                        person: "lily butt",
                        action: "commented on your post",
                        text: "very nice",
                        time: [-3, "hour"],
                    },
                    {
                        image: "https://source.unsplash.com/KBv5dEN3QtY",
                        person: "frank morris",
                        action: "shared your post",
                        text: "",
                        time: [-1, "day"],
                    },
                    {
                        image: "https://source.unsplash.com/uyaTT9u6AvI",
                        person: "alex stone",
                        action: "reacted your photo",
                        text: "love",
                        time: [-4, "day"],
                    },
                ].map(({ image, person, action, text, time }, i) => ((0, jsx_runtime_1.jsx)(SingleNotification_1.default, { image: image, person: person, action: action, text: text, 
                    //@ts-ignore
                    time: time }, `asdfasdf${i}`))) })] }));
}
exports.default = Notifications;
