"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: "AIzaSyDgVcY5k8S0SYON7J_4TTB6hmE1iDVv_so",
    authDomain: "book-community-8cbb7.firebaseapp.com",
    projectId: "book-community-8cbb7",
    storageBucket: "book-community-8cbb7.appspot.com",
    messagingSenderId: "432592952832",
    appId: "1:432592952832:web:06069995b8179cf80a02e5",
};
exports.app = (0, app_1.initializeApp)(firebaseConfig);
