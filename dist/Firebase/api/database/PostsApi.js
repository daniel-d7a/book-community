"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.votePost = exports.deletePostById = exports.createPost = exports.getPostById = exports.getUserPosts = exports.getAllPostsPaginated = exports.getAllPosts = void 0;
const firestore_1 = require("firebase/firestore");
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const Posts_1 = require("../../../Types/Posts");
const storage_1 = require("firebase/storage");
const database_2 = require("./database");
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
function paginate() {
    let q;
    let querySnapshot;
    return async function () {
        console.log("last snap", querySnapshot);
        if (querySnapshot) {
            q = (0, firestore_1.query)(postsCollectionRef, (0, firestore_1.orderBy)("created_at", "desc"), (0, firestore_1.limit)(3), (0, firestore_1.startAfter)(querySnapshot.docs.at(-1)));
        }
        else {
            q = (0, firestore_1.query)(postsCollectionRef, (0, firestore_1.orderBy)("created_at", "desc"), (0, firestore_1.limit)(3));
        }
        querySnapshot = await (0, firestore_1.getDocs)(q);
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
    };
}
exports.getAllPostsPaginated = paginate();
/**
 * Retrieves the posts of a user from the API.
 *
 * @param {string} userId - The ID of the user whose posts will be retrieved.
 * @throws {Error} If the user ID is empty
 * @return {Promise<ApiPost[]>} A promise that resolves to an array of ApiPost objects representing the user's posts.
 */
async function getUserPosts(userId) {
    if (!userId)
        throw new Error("userId cannot be empty");
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
 * @throws {Error} If the ID is empty
 * @return {Promise<ApiPost>} A promise that resolves to the retrieved post.
 */
async function getPostById(id) {
    if (!id)
        throw new Error("id cannot be empty");
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
 * @throws {Error} If post is not a valid Post object
 * @throws {Error} If post is empty
 * @return {Promise<string>} A Promise that resolves to the ID of the newly created post.
 */
async function createPost(post) {
    if (!post)
        throw new Error("post cannot be empty");
    if (Posts_1.postSchema.safeParse(post).success === false)
        throw new Error("post must be a valid Post object");
    console.log("post from api", post);
    const newPostId = await (0, firestore_1.addDoc)(postsCollectionRef, {
        text: post.text,
        created_at: firestore_1.Timestamp.now(),
        user_id: auth_1.auth?.currentUser?.uid,
        comment_ids: [],
        votes: 0,
        voter_ids: [],
    });
    console.log("doc added", newPostId.id);
    const { images } = post;
    const urls = await Promise.all(images.map(async (image) => {
        const postImageStorageRef = (0, storage_1.ref)(database_2.storage, `posts/${newPostId.id}/${image.name}`);
        await (0, storage_1.uploadBytes)(postImageStorageRef, image);
        return await (0, storage_1.getDownloadURL)(postImageStorageRef);
    }));
    console.log("urls", urls);
    await (0, firestore_1.updateDoc)((0, firestore_1.doc)(database_1.db, "posts", newPostId.id), {
        images: urls,
    });
    console.log("doc updated");
    return newPostId.id;
}
exports.createPost = createPost;
/**
 * Creates a new post.
 *
 * @param {Post} post - The post object containing the details of the post.
 * @throws {Error} If the id is empty.
 * @return {Promise<string>} A Promise that resolves to the ID of the newly created post.
 */
async function deletePostById(id) {
    if (!id)
        throw new Error("id cannot be empty");
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", id);
    return await (0, firestore_1.deleteDoc)(docRef);
}
exports.deletePostById = deletePostById;
/**
 * Updates the vote count for a post.
 *
 * @param {string} id - The ID of the post.
 * @param {"up" | "down"} vote - The vote type ("up" or "down").
 * @throws {Error} If the vote is not "up" or "down".
 * @return {Promise<void>} - A promise that resolves when the vote is updated.
 */
async function votePost(id, vote) {
    if (vote !== "up" && vote !== "down")
        throw new Error(`Invalid vote, vote should only be "up" or "down"`);
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
