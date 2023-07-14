"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const Home_1 = __importDefault(require("./Components/Home/Home"));
// import Post from "./Components/Post/Post";
const Nav_1 = __importDefault(require("./Components/Nav/Nav"));
const Notifications_1 = __importDefault(require("./Components/Notifications/Notifications"));
const react_router_dom_1 = require("react-router-dom");
const signup_1 = __importDefault(require("./Components/Signup/signup"));
const login_1 = __importDefault(require("./Components/Login/login"));
const testQueries_1 = __importDefault(require("./testQueries"));
class User {
    constructor(id, username, state, profile, starred = []) {
        this.id = id;
        this.username = username;
        this.state = state;
        this.starred = starred;
        this.profile = profile;
    }
    addStarred(post) {
        this.starred.push(post);
    }
}
class PostObj {
    constructor(id, user, community, date, text, image, location = null, commments, votes = 0) {
        this.id = id;
        this.user = user;
        this.community = community;
        this.location = location;
        this.date = date;
        this.text = text;
        this.image = image;
        this.votes = votes;
        this.comments = commments;
    }
    setVotes(vote) {
        this.votes += vote;
    }
    setLocation(loc) {
        this.location = loc;
    }
    addComment(comment) {
        this.comments.push(comment);
    }
}
class Comment {
    constructor(id, user, text, replies) {
        this.id = id;
        this.user = user;
        this.text = text;
        this.replies = replies;
    }
}
class Reply {
    constructor(id, user, text) {
        this.id = id;
        this.user = user;
        this.text = text;
    }
}
function App() {
    const user = new User(1, "Ehab Mohamed", "w", "https://spunout.ie/wp-content/uploads/2021/01/portrait-black-young-man-face-man-person-ethnic-student-diversity-diverse-confident-millennial_t20_K6aZOV-2.jpg");
    const reply = new Reply(1, user, "I agreeeeee");
    const comment = new Comment(1, user, "Yeah I Like this book", Array(2).fill(reply));
    const comments = Array(15).fill(comment);
    const post = new PostObj(1, user, "Head First Javascript", 30, "best book about javascript, hands down, would very much recommend for any one who is just starting out.", "https://www.flenov.info//pics/4a5/4077-HeadFirstJavaScript.jpg", "Cairo, Egypt", comments, 14);
    const posts = Array(5).fill("post");
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "pb-14", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(Home_1.default, { feed: posts }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/notifications", element: (0, jsx_runtime_1.jsx)(Notifications_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/signup", element: (0, jsx_runtime_1.jsx)(signup_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: (0, jsx_runtime_1.jsx)(login_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/test", element: (0, jsx_runtime_1.jsx)(testQueries_1.default, {}) })] }) }), (0, jsx_runtime_1.jsx)(Nav_1.default, {})] }));
}
exports.default = App;
