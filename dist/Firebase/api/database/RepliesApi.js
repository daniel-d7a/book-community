"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.voteReply = exports.addReply = exports.getCommentReplies = void 0;
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const firestore_1 = require("firebase/firestore");
const replyCollectionRef = (0, firestore_1.collection)(database_1.db, "replies");
/**
 * Retrieves the replies to a comment.
 *
 * @param {string} commentId - The ID of the comment.
 * @throws {Error} If the comment ID is empty.
 * @return {Promise<ApiReply[]>} A promise that resolves with an array of reply objects.
 */
async function getCommentReplies(commentId) {
    if (!commentId)
        throw new Error("commentId cannot be empty");
    const docRef = (0, firestore_1.doc)(database_1.db, "comments", commentId);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    const replyIds = docSnap.data()?.reply_ids;
    return (await Promise.all(replyIds.map(async (id) => {
        const replyData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "replies", id))).data();
        const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", replyData?.user_id))).data();
        return {
            id,
            ...replyData,
            user_data: userData,
        };
    }))).sort((a, b) => b.created_at - a.created_at);
}
exports.getCommentReplies = getCommentReplies;
/**
 * Adds a reply to a comment.
 *
 * @param {string} commentId - The ID of the comment to add the reply to.
 * @param {string} text - The text of the reply.
 * @throws {Error} If the reply text is empty.
 * @throws {Error} If the comment ID is empty.
 * @return {Promise<void>} A promise that resolves when the reply is added successfully.
 */
async function addReply(commentId, text) {
    if (!commentId)
        throw new Error("commentId cannot be empty");
    if (!text)
        throw new Error("text cannot be empty");
    const newReplyId = await (0, firestore_1.addDoc)(replyCollectionRef, {
        text,
        created_at: firestore_1.Timestamp.now(),
        user_id: auth_1.auth?.currentUser?.uid,
        comment_id: commentId,
        votes: 0,
        voter_ids: [],
    });
    const docRef = (0, firestore_1.doc)(database_1.db, "comments", commentId);
    return await (0, firestore_1.updateDoc)(docRef, {
        reply_ids: (0, firestore_1.arrayUnion)(newReplyId.id),
    });
}
exports.addReply = addReply;
/**
 * Vote on a reply.
 *
 * @param {string} id - The ID of the comment.
 * @param {"up" | "down"} vote - The type of vote ("up" or "down").
 * @throws {Error} If the vote is not "up" or "down".
 * @return {Promise<void>} Promise that resolves when the vote is successfully recorded.
 */
async function voteReply(id, vote) {
    if (vote !== "up" && vote !== "down")
        throw new Error(`Invalid vote, vote should only be "up" or "down"`);
    const docRef = (0, firestore_1.doc)(database_1.db, "replies", id);
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
exports.voteReply = voteReply;
