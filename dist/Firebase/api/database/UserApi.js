"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatUserAfterSignUp = exports.getUserById = void 0;
const firestore_1 = require("firebase/firestore");
const database_1 = require("./database");
const userCollectionRef = (0, firestore_1.collection)(database_1.db, "users");
async function getUserById(id) {
    const userDocRef = (0, firestore_1.doc)(database_1.db, "users", id);
    const userDoc = await (0, firestore_1.getDoc)(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data();
    }
    else {
        console.log("No such document!");
        return null;
    }
}
exports.getUserById = getUserById;
async function creatUserAfterSignUp(id, user) {
    const docRef = (0, firestore_1.doc)(database_1.db, "users", id);
    return await (0, firestore_1.setDoc)(docRef, user);
}
exports.creatUserAfterSignUp = creatUserAfterSignUp;
