"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = exports.getPostComments = void 0;
const database_1 = require("./database");
const auth_1 = require("../auth/auth");
const firestore_1 = require("firebase/firestore");
const commentsCollectionRef = (0, firestore_1.collection)(database_1.db, "comments");
async function getPostComments(postId) {
    const docRef = (0, firestore_1.doc)(database_1.db, "posts", postId);
    const docSnap = await (0, firestore_1.getDoc)(docRef);
    const commentIds = docSnap.data()?.comment_ids;
    return await Promise.all(commentIds.map(async (id) => {
        const commentData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "comments", id))).data();
        console.log("comment data", commentData);
        const userData = (await (0, firestore_1.getDoc)((0, firestore_1.doc)(database_1.db, "users", commentData?.user_id))).data();
        return {
            id,
            ...commentData,
            user_data: userData,
        };
    }));
}
exports.getPostComments = getPostComments;
async function addComment(postId, commentText) {
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
