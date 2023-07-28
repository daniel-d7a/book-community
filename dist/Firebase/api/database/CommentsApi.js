"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteComment = exports.addComment = exports.getPostComments = void 0;
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const firestore_1 = require("firebase/firestore");
const commentsCollectionRef = (0, firestore_1.collection)(database_1.db, "comments");
/**
 * Retrieves the comments for a specific post.
 *
 * @param {string} postId - The ID of the post.
 * @throws {Error} If the post ID is empty.
 * @return {Promise<ApiComment[]>} A promise that resolves to an array of comment data for the post.
 */
async function getPostComments(postId) {
    if (!postId)
        throw new Error("postId cannot be empty");
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", postId);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    const commentIds = docSnap.data()?.comment_ids;
    console.log(commentIds);
    const comments = await Promise.all(commentIds.map(async (id) => {
        const commentData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "comments", id))).data();
        console.log("comment data", commentData);
        const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", commentData?.user_id))).data();
        return {
            id,
            ...commentData,
            user_data: userData,
        };
    }));
    return comments.sort((a, b) => b.created_at - a.created_at);
}
exports.getPostComments = getPostComments;
/**
 * Adds a comment to a post.
 *
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {string} commentText - The text of the comment.
 * @throws {Error} If the comment text is empty.
 * @throws {Error} If the post Id is empty.
 * @return {Promise<void>} - A promise that resolves when the comment is added.
 */
async function addComment(postId, commentText) {
    if (!commentText)
        throw new Error("commentText cannot be empty");
    if (!postId)
        throw new Error("postId cannot be empty");
    //create new doc in comments collection
    const newCommentId = await (0, firestore_1.addDoc)(commentsCollectionRef, {
        text: commentText,
        created_at: firestore_1.Timestamp.now(),
        user_id: auth_1.auth?.currentUser?.uid,
        post_id: postId,
        reply_ids: [],
        votes: 0,
        voter_ids: [],
    });
    console.log("new comment id", newCommentId);
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", postId);
    return await (0, firestore_1.updateDoc)(docRef, {
        comment_ids: (0, firestore_1.arrayUnion)(newCommentId.id),
    });
}
exports.addComment = addComment;
/**
 * Vote on a comment.
 *
 * @param {string} id - The ID of the comment.
 * @param {"up" | "down"} vote - The type of vote ("up" or "down").
 * @throws {Error} If the vote is not "up" or "down".
 * @return {Promise<void>} Promise that resolves when the vote is successfully recorded.
 */
async function voteComment(id, vote) {
    if (vote !== "up" && vote !== "down")
        throw new Error(`Invalid vote, vote should only be "up" or "down"`);
    const docRef = (0, firestore_1.doc)(database_1.db, "comments", id);
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
exports.voteComment = voteComment;
