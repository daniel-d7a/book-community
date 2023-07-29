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
  increment,
} from "firebase/firestore";
import { ApiReply } from "../../../Types/Replies";

const replyCollectionRef = collection(db, "replies");

/**
 * Retrieves the replies to a comment.
 *
 * @param {string} commentId - The ID of the comment.
 * @throws {Error} If the comment ID is empty.
 * @return {Promise<ApiReply[]>} A promise that resolves with an array of reply objects.
 */
export async function getCommentReplies(
  commentId: string
): Promise<ApiReply[]> {
  if (!commentId) throw new Error("commentId cannot be empty");

  const docRef = doc(db, "comments", commentId);
  const docSnap = await getDoc(docRef);
  const replyIds = docSnap.data()?.reply_ids;
  return (
    await Promise.all(
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
    )
  ).sort((a, b) => b.created_at - a.created_at);
}

/**
 * Adds a reply to a comment.
 *
 * @param {string} commentId - The ID of the comment to add the reply to.
 * @param {string} text - The text of the reply.
 * @throws {Error} If the reply text is empty.
 * @throws {Error} If the comment ID is empty.
 * @return {Promise<void>} A promise that resolves when the reply is added successfully.
 */
export async function addReply(commentId: string, text: string): Promise<void> {
  if (!commentId) throw new Error("commentId cannot be empty");
  if (!text) throw new Error("text cannot be empty");

  const newReplyId = await addDoc(replyCollectionRef, {
    text,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    comment_id: commentId,
    votes: 0,
    voter_ids: [],
  });

  const docRef = doc(db, "comments", commentId);
  return await updateDoc(docRef, {
    reply_ids: arrayUnion(newReplyId.id),
  });
}

/**
 * Vote on a reply.
 *
 * @param {string} id - The ID of the comment.
 * @param {"up" | "down"} vote - The type of vote ("up" or "down").
 * @throws {Error} If the vote is not "up" or "down".
 * @return {Promise<void>} Promise that resolves when the vote is successfully recorded.
 */
export async function voteReply(
  id: string,
  vote: "up" | "down"
): Promise<void> {
  if (vote !== "up" && vote !== "down")
    throw new Error(`Invalid vote, vote should only be "up" or "down"`);
  const docRef = doc(db, "replies", id);
  const docData = (await getDoc(docRef)).data();

  console.log("current user id", auth?.currentUser?.uid);
  console.log("doc data", docData);

  const ids = docData?.voter_ids.map(({ id }: { id: string }) => id);

  if (!ids.includes(auth?.currentUser?.uid)) {
    return await updateDoc(docRef, {
      votes: increment(vote === "up" ? 1 : -1),
      voter_ids: arrayUnion({ id: auth?.currentUser?.uid, vote }),
    });
  } else {
    const voter = docData?.voter_ids.find(
      ({ id }: { id: string }) => id === auth?.currentUser?.uid
    );

    const newVoter_ids = docData?.voter_ids.filter(
      ({ id }: { id: string }) => id !== auth?.currentUser?.uid
    );

    if (voter.vote === vote) {
      return await updateDoc(docRef, {
        votes: increment(vote === "up" ? -1 : 1),
        voter_ids: [...newVoter_ids],
      });
    } else {
      return await updateDoc(docRef, {
        votes: increment(vote === "up" ? 2 : -2),
        voter_ids: [...newVoter_ids, { id: auth?.currentUser?.uid, vote }],
      });
    }
  }
}
