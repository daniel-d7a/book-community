"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.logout = exports.login = exports.signup = exports.auth = void 0;
const fireBaseConfig_1 = require("../../fireBaseConfig");
const auth_1 = require("firebase/auth");
const auth_2 = require("firebase/auth");
const UserApi_1 = require("../database/UserApi");
// TODO: add try catches to catch errors
exports.auth = (0, auth_1.getAuth)(fireBaseConfig_1.app);
async function signup(user) {
    const { user: { uid }, } = await (0, auth_2.createUserWithEmailAndPassword)(exports.auth, user.email, user.password);
    return await (0, UserApi_1.createUserAfterSignUp)(uid, user);
}
exports.signup = signup;
async function login(data) {
    if (data.rememberMe) {
        await (0, auth_2.setPersistence)(exports.auth, auth_2.browserLocalPersistence);
    }
    else {
        await (0, auth_2.setPersistence)(exports.auth, auth_2.browserSessionPersistence);
    }
    const userData = await (0, auth_2.signInWithEmailAndPassword)(exports.auth, data.email, data.password);
    if (data.rememberMe) {
        window.localStorage.setItem("currentUser", JSON.stringify(userData));
    }
    else {
        window.sessionStorage.setItem("currentUser", JSON.stringify(userData));
    }
    return userData;
}
exports.login = login;
async function logout() {
    return await exports.auth.signOut();
}
exports.logout = logout;
async function getCurrentUser() {
    return await exports.auth.currentUser;
}
exports.getCurrentUser = getCurrentUser;
