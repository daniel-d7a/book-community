import { db } from "./database";
import { auth } from "../auth/auth";

import {
  doc,
  getDoc,
  Timestamp,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

const replyCollectionRef = collection(db, "replies");

export async function getCommentReplies(commentId: string) {
  const docRef = doc(db, "comments", commentId);
  const docSnap = await getDoc(docRef);
  const replyIds = docSnap.data()?.reply_ids;
  return await Promise.all(
    replyIds.map(async (id: string) => {
      const replyData = (await getDoc(doc(db, "replies", id))).data();
      const userData = (
        await getDoc(doc(db, "users", replyData?.user_id))
      ).data();
      return {
        id,
        ...replyData,
        user_data: userData,
      };
    })
  );
}

/**
 * Adds a reply to a comment.
 *
 * @param {string} commentId - The ID of the comment to add the reply to.
 * @param {string} text - The text of the reply.
 * @return {Promise<void>} A promise that resolves when the reply is added successfully.
 */
export async function addReply(commentId: string, text: string): Promise<void> {
  const newReplyId = await addDoc(replyCollectionRef, {
    text,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    comment_id: commentId,
  });

  const docRef = doc(db, "comments", commentId);
  return await updateDoc(docRef, {
    reply_ids: arrayUnion(newReplyId.id),
  });
}
