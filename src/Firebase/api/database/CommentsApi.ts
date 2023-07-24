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
} from "firebase/firestore";
import { ApiComment } from "../../../Types/Comments";

const commentsCollectionRef = collection(db, "comments");

/**
 * Retrieves the comments for a specific post.
 *
 * @param {string} postId - The ID of the post.
 * @return {Promise<ApiComment[]>} A promise that resolves to an array of comment data for the post.
 */
export async function getPostComments(postId: string): Promise<ApiComment[]> {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  const commentIds = docSnap.data()?.comment_ids;
  console.log(commentIds);

  return await Promise.all(
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
}

/**
 * Adds a comment to a post.
 *
 * @param {string} postId - The ID of the post to add the comment to.
 * @param {string} commentText - The text of the comment.
 * @return {Promise<void>} - A promise that resolves when the comment is added.
 */
export async function addComment(
  postId: string,
  commentText: string
): Promise<void> {
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
