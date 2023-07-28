import { db } from "./database";
import { auth } from "../auth/auth";
import {
  collection,
  getDoc,
  doc,
  Timestamp,
  addDoc,
  updateDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { ApiComment } from "../../../Types/Comments";

const commentsCollectionRef = collection(db, "comments");

/**
 * Retrieves the comments for a specific post.
 *
 * @param {string} postId - The ID of the post.
 * @throws {Error} If the post ID is empty.
 * @return {Promise<ApiComment[]>} A promise that resolves to an array of comment data for the post.
 */
export async function getPostComments(postId: string): Promise<ApiComment[]> {

  if (!postId) throw new Error("postId cannot be empty");

  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  const commentIds = docSnap.data()?.comment_ids;
  console.log(commentIds);

  const comments = await Promise.all(
    commentIds.map(async (id: string) => {
      const commentData = (await getDoc(doc(db, "comments", id))).data();
      console.log("comment data", commentData);

      const userData = (
        await getDoc(doc(db, "users", commentData?.user_id))
      ).data();
      return {
        id,
        ...commentData,
        user_data: userData,
      };
    })
  );

  return comments.sort((a, b) => b.created_at - a.created_at);
}

/**
 * Adds a comment to a post.
 *
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {string} commentText - The text of the comment.
 * @throws {Error} If the comment text is empty.
 * @throws {Error} If the post Id is empty.
 * @return {Promise<void>} - A promise that resolves when the comment is added.
 */
export async function addComment(
  postId: string,
  commentText: string
): Promise<void> {

  if (!commentText) throw new Error("commentText cannot be empty");
  if(!postId) throw new Error("postId cannot be empty");

  //create new doc in comments collection
  const newCommentId = await addDoc(commentsCollectionRef, {
    text: commentText,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    post_id: postId,
    reply_ids: [],
    votes: 0,
    voter_ids: [],
  });

  console.log("new comment id", newCommentId);

  const docRef = doc(db, "posts", postId);
  return await updateDoc(docRef, {
    comment_ids: arrayUnion(newCommentId.id),
  });
}

/**
 * Vote on a comment.
 *
 * @param {string} id - The ID of the comment.
 * @param {"up" | "down"} vote - The type of vote ("up" or "down").
 * @throws {Error} If the vote is not "up" or "down".
 * @return {Promise<void>} Promise that resolves when the vote is successfully recorded.
 */
export async function voteComment(
  id: string,
  vote: "up" | "down"
): Promise<void> {
  if (vote !== "up" && vote !== "down")
    throw new Error(`Invalid vote, vote should only be "up" or "down"`);
  const docRef = doc(db, "comments", id);
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
