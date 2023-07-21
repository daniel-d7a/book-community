import {
  collection,
  getDocs,
  query,
  doc,
  where,
  getDoc,
  addDoc,
  deleteDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";

import { db } from "./database";
import { auth } from "../auth/auth";
import { ApiPost, Post } from "../../../Types/Posts";

const postsCollectionRef = collection(db, "posts");

export async function getAllPosts(): Promise<ApiPost[]> {
  const q = query(postsCollectionRef, orderBy("created_at", "desc"));
  const querySnapshot = await getDocs(q);
  // console.log("query docs", querySnapshot.docs);

  const postsData: ApiPost[] = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as ApiPost;
  });

  return await Promise.all(
    postsData.map(async (singlePost) => {
      const userData = (
        await getDoc(doc(db, "users", singlePost.user_id))
      ).data();
      // console.log("user data", userData);
      return { ...singlePost, user_data: userData } as ApiPost;
    })
  );
}

export async function getUserPosts(userId: string): Promise<ApiPost[]> {
  const userData = (await getDoc(doc(db, "users", userId))).data();
  const q = query(postsCollectionRef, where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      user_data: userData,
    } as ApiPost;
  });
}

export async function getPostById(id: string): Promise<ApiPost> {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const docData = docSnap.data();
  const userData = (await getDoc(doc(db, "users", docData?.user_id))).data();
  return {
    id: docSnap.id,
    ...docData,
    user_data: userData,
  } as ApiPost;
}

export async function createPost(post: Post): Promise<string> {
  console.log("post from api", post);
  const newPostId = await addDoc(postsCollectionRef, {
    ...post,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    comment_ids: [],
    votes: 0,
    voter_ids: [],
  });
  return newPostId.id;
}

export async function deletePostById(id: string): Promise<void> {
  const docRef = doc(db, "posts", id);
  return await deleteDoc(docRef);
}
