"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.votePost = exports.deletePostById = exports.createPost = exports.getPostById = exports.getUserPosts = exports.getAllPosts = void 0;
const firestore_1 = require("firebase/firestore");
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const postsCollectionRef = (0, firestore_1.collection)(database_1.db, "posts");
/**
 * Retrieves all posts from the API.
 *
 * @return {Promise<ApiPost[]>} A promise that resolves to an array of ApiPost objects.
 */
async function getAllPosts() {
    const q = (0, firestore_1.query)(postsCollectionRef, (0, firestore_1.orderBy)("created_at", "desc"));
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    // console.log("query docs", querySnapshot.docs);
    const postsData = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
        };
    });
    return await Promise.all(postsData.map(async (singlePost) => {
        const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", singlePost.user_id))).data();
        // console.log("user data", userData);
        return { ...singlePost, user_data: userData };
    }));
}
exports.getAllPosts = getAllPosts;
/**
 * Retrieves the posts of a user from the API.
 *
 * @param {string} userId - The ID of the user whose posts will be retrieved.
 * @return {Promise<ApiPost[]>} A promise that resolves to an array of ApiPost objects representing the user's posts.
 */
async function getUserPosts(userId) {
    const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", userId))).data();
    const q = (0, firestore_1.query)(postsCollectionRef, (0, firestore_1.where)("user_id", "==", userId));
    const querySnapshot = await (0, firestore_1.getDocs)(q);
    return querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data(),
            user_data: userData,
        };
    });
}
exports.getUserPosts = getUserPosts;
/**
 * Retrieves a post from the API by its ID.
 *
 * @param {string} id - The ID of the post.
 * @return {Promise<ApiPost>} A promise that resolves to the retrieved post.
 */
async function getPostById(id) {
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", id);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    const docData = docSnap.data();
    const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", docData?.user_id))).data();
    return {
        id: docSnap.id,
        ...docData,
        user_data: userData,
    };
}
exports.getPostById = getPostById;
/**
 * Creates a new post.
 *
 * @param {Post} post - The post object containing the details of the post.
 * @return {Promise<string>} A Promise that resolves to the ID of the newly created post.
 */
async function createPost(post) {
    console.log("post from api", post);
    const newPostId = await (0, firestore_1.addDoc)(postsCollectionRef, {
        ...post,
        created_at: firestore_1.Timestamp.now(),
        user_id: auth_1.auth?.currentUser?.uid,
        comment_ids: [],
        votes: 0,
        voter_ids: [],
    });
    return newPostId.id;
}
exports.createPost = createPost;
/**
 * Creates a new post.
 *
 * @param {Post} post - The post object containing the details of the post.
 * @return {Promise<string>} A Promise that resolves to the ID of the newly created post.
 */
async function deletePostById(id) {
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", id);
    return await (0, firestore_1.deleteDoc)(docRef);
}
exports.deletePostById = deletePostById;
/**
 * Vote on a post.
 *
 * @param {string} id - The ID of the post.
 * @param {"up" | "down"} vote - The type of vote ("up" or "down").
 * @return {Promise<void>} Promise that resolves when the vote is successfully recorded.
 */
async function votePost(id, vote) {
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", id);
    const docData = (await (0, firestore_1.getDoc)(docRef)).data();
    console.log("current user id", auth_1.auth?.currentUser?.uid);
    console.log("doc data", docData);
    const ids = docData?.voter_ids.map(({ id }) => id);
    if (!ids.includes(auth_1.auth?.currentUser?.uid)) {
        return await (0, firestore_1.updateDoc)(docRef, {
            votes: (0, firestore_1.increment)(vote === "up" ? 1 : -1),
            voter_ids: (0, firestore_1.arrayUnion)({ id: auth_1.auth?.currentUser?.uid, vote }),
        });
    }
    else {
        const voter = docData?.voter_ids.find(({ id }) => id === auth_1.auth?.currentUser?.uid);
        const newVoter_ids = docData?.voter_ids.filter(({ id }) => id !== auth_1.auth?.currentUser?.uid);
        if (voter.vote === vote) {
            return await (0, firestore_1.updateDoc)(docRef, {
                votes: (0, firestore_1.increment)(vote === "up" ? -1 : 1),
                voter_ids: [...newVoter_ids],
            });
        }
        else {
            return await (0, firestore_1.updateDoc)(docRef, {
                votes: (0, firestore_1.increment)(vote === "up" ? 2 : -2),
                voter_ids: [...newVoter_ids, { id: auth_1.auth?.currentUser?.uid, vote }],
            });
        }
    }
}
exports.votePost = votePost;
