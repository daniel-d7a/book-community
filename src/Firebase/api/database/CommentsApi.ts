import { db } from "./database";
import { auth } from "../auth/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  Timestamp,
  addDoc,
} from "firebase/firestore";

const commentsCollectionRef = collection(db, "comments");

export async function getPostComments(postId: string) {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  const commentIds = docSnap.data()?.comment_ids;

  return await Promise.all(
    commentIds.map(async (id: string) => {
      const commentData = (await getDoc(doc(db, "comments", id))).data();
      return {
        id,
        ...commentData,
      };
    })
  );
}

export async function addComment(postId: string, commentText: string) {
  //create new doc in comments collection
  const newCommentId = await addDoc(commentsCollectionRef, {
    text: commentText,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    post_id: postId,
  });

  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
}
