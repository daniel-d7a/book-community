"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostById = exports.createPost = exports.getPostById = exports.getUserPosts = exports.getAllPosts = void 0;
const firestore_1 = require("firebase/firestore");
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const postsCollectionRef = (0, firestore_1.collection)(database_1.db, "posts");
async function getAllPosts() {
    const q = (0, firestore_1.query)(postsCollectionRef);
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    console.log("query docs", querySnapshot.docs);
    const postsData = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });
    return await Promise.all(postsData.map(async (singlePost) => {
        const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", singlePost.user_id))).data();
        console.log("user data", userData);
        return { ...singlePost, user_data: userData };
    }));
}
exports.getAllPosts = getAllPosts;
async function getUserPosts(userId) {
    const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", userId))).data();
    const q = (0, firestore_1.query)(postsCollectionRef, (0, firestore_1.where)("user_id", "==", userId));
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    return querySnapshot.docs.map((doc) => {
        return {
            ...doc.data(),
            user_data: userData,
        };
    });
}
exports.getUserPosts = getUserPosts;
async function getPostById(id) {
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", id);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    return docSnap.data();
}
exports.getPostById = getPostById;
const createPost = async (post) => {
    console.log("post from api", post);
    return await (0, firestore_1.addDoc)(postsCollectionRef, {
        ...post,
        created_at: firestore_1.Timestamp.now(),
        user_id: auth_1.auth?.currentUser?.uid,
        comment_ids: [],
        votes: 0,
        voter_ids: [],
    });
};
exports.createPost = createPost;
const deletePostById = async (id) => {
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", id);
    return await (0, firestore_1.deleteDoc)(docRef);
};
exports.deletePostById = deletePostById;
