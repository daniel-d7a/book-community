"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadUserProfilePhoto = exports.createUserAfterSignUp = exports.getUserById = void 0;
const firestore_1 = require("firebase/firestore");
const database_1 = require("./database");
const Auth_1 = require("../../../Types/Auth");
const database_2 = require("./database");
const storage_1 = require("firebase/storage");
const userCollectionRef = (0, firestore_1.collection)(database_1.db, "users");
/**
 * Retrieves a user by their ID from the database.
 *
 * @param {string} id - The ID of the user to retrieve.
 * @throws {Error} If the ID is empty.
 * @throws {Error} If the user does not exist.
 * @return {Promise<SignUpData>} A promise that resolves with the user data if found
 */
async function getUserById(id) {
    if (!id)
        throw new Error("id cannot be empty");
    const userDocRef = (0, firestore_1.doc)(database_1.db, "users", id);
    const userDoc = await (0, firestore_1.getDoc)(userDocRef);
    if (userDoc.exists()) {
        return userDoc.data();
    }
    else {
        throw new Error("User dows not exist");
    }
}
exports.getUserById = getUserById;
/**
 * Creates a user in the user collection after sign up.
 *
 * @param {string} id - The user ID.
 * @param {SignUpData} user - The user object.
 * @throws {Error} If the user ID is empty.
 * @throws {Error} If the user object is not a valid SignUpData object.
 * @throws {Error} If the user object is empty
 * @return {Promise<void>} - A promise that resolves when the user is created.
 */
async function createUserAfterSignUp(id, user) {
    if (!id)
        throw new Error("id cannot be empty");
    if (!user)
        throw new Error("user cannot be empty");
    if (Auth_1.signUpDataSchema.safeParse(user).success === false)
        throw new Error("user must be a valid SignUpData object");
    const docRef = (0, firestore_1.doc)(database_1.db, "users", id);
    return await (0, firestore_1.setDoc)(docRef, user);
}
exports.createUserAfterSignUp = createUserAfterSignUp;
/**
 * Uploads the user's profile photo.
 *
 * @param {string} userId - The ID of the user.
 * @param {File} image - The image file to upload.
 * @throws {Error} If the image is empty.
 * @throws {Error} If the user ID is empty.
 * @return {Promise<void>} A promise that resolves when the profile photo is uploaded.
 */
async function uploadUserProfilePhoto(userId, image) {
    if (!userId)
        throw new Error("userId cannot be empty");
    if (!image)
        throw new Error("image cannot be empty");
    const storageRef = (0, storage_1.ref)(database_2.storage, `profile photos/${userId}`);
    await (0, storage_1.uploadBytes)(storageRef, image);
    const imageUrl = await (0, storage_1.getDownloadURL)(storageRef);
    const docRef = (0, firestore_1.doc)(database_1.db, "users", userId);
    return await (0, firestore_1.updateDoc)(docRef, {
        profile_photo: imageUrl,
    });
}
exports.uploadUserProfilePhoto = uploadUserProfilePhoto;
