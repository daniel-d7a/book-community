"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserProfilePhoto = exports.createUserAfterSignUp = exports.getUserById = void 0;
const firestore_1 = require("firebase/firestore");
const database_1 = require("./database");
const database_2 = require("./database");
const storage_1 = require("firebase/storage");
const userCollectionRef = (0, firestore_1.collection)(database_1.db, "users");
/**
 * Retrieves a user by their ID from the database.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @return {Promise<SignUpData | null>} A promise that resolves with the user data if found, or null if not found.
 */
async function getUserById(id = "") {
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
/**
 * Creates a user in the user collection after sign up.
 *
 * @param {string} id - The user ID.
 * @param {SignUpData} user - The user object.
 * @return {Promise<void>} - A promise that resolves when the user is created.
 */
async function createUserAfterSignUp(id, user) {
    const docRef = (0, firestore_1.doc)(database_1.db, "users", id);
    return await (0, firestore_1.setDoc)(docRef, user);
}
exports.createUserAfterSignUp = createUserAfterSignUp;
/**
 * Uploads the user's profile photo.
 *
 * @param {string} userId - The ID of the user.
 * @param {File} image - The image file to upload.
 * @return {Promise<void>} A promise that resolves when the profile photo is uploaded.
 */
async function uploadUserProfilePhoto(userId, image) {
    const storageRef = (0, storage_1.ref)(database_2.storage, `profile photos/${userId}`);
    await (0, storage_1.uploadBytes)(storageRef, image);
    const imageUrl = await (0, storage_1.getDownloadURL)(storageRef);
    const docRef = (0, firestore_1.doc)(database_1.db, "users", userId);
    return await (0, firestore_1.updateDoc)(docRef, {
        profile_photo: imageUrl,
    });
}
exports.uploadUserProfilePhoto = uploadUserProfilePhoto;
