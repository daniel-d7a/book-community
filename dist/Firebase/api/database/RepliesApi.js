"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReply = exports.getCommentReplies = void 0;
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const firestore_1 = require("firebase/firestore");
const replyCollectionRef = (0, firestore_1.collection)(database_1.db, "replies");
/**
 * Retrieves the replies to a comment.
 *
 * @param {string} commentId - The ID of the comment.
 * @return {Promise<ApiReply[]>} A promise that resolves with an array of reply objects.
 */
async function getCommentReplies(commentId) {
    const docRef = (0, firestore_1.doc)(database_1.db, "comments", commentId);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    const replyIds = docSnap.data()?.reply_ids;
    return await Promise.all(replyIds.map(async (id) => {
        const replyData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "replies", id))).data();
        const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", replyData?.user_id))).data();
        return {
            id,
            ...replyData,
            user_data: userData,
        };
    }));
}
exports.getCommentReplies = getCommentReplies;
/**
 * Adds a reply to a comment.
 *
 * @param {string} commentId - The ID of the comment to add the reply to.
 * @param {string} text - The text of the reply.
 * @return {Promise<void>} A promise that resolves when the reply is added successfully.
 */
async function addReply(commentId, text) {
    const newReplyId = await (0, firestore_1.addDoc)(replyCollectionRef, {
        text,
        created_at: firestore_1.Timestamp.now(),
        user_id: auth_1.auth?.currentUser?.uid,
        comment_id: commentId,
    });
    const docRef = (0, firestore_1.doc)(database_1.db, "comments", commentId);
    return await (0, firestore_1.updateDoc)(docRef, {
        reply_ids: (0, firestore_1.arrayUnion)(newReplyId.id),
    });
}
exports.addReply = addReply;
