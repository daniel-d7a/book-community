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
} from "firebase/firestore";

import { db } from "./database";
import { auth } from "../auth/auth";
import { ApiPost, Post } from "../../../Types/Posts";

//TODO: add return types

const postsCollectionRef = collection(db, "posts");

export async function getAllPosts() {
  const q = query(postsCollectionRef);
  const querySnapshot = await getDocs(q);
  console.log("query docs", querySnapshot.docs);

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
      console.log("user data", userData);
      return { ...singlePost, user_data: userData };
    })
  );
}

export async function getUserPosts(userId: string) {
  const userData = (await getDoc(doc(db, "users", userId))).data();
  const q = query(postsCollectionRef, where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return {
      ...doc.data(),
      user_data: userData,
    };
  });
}

export async function getPostById(id: string) {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const createPost = async (post: Post) => {
  console.log("post from api", post);
  return await addDoc(postsCollectionRef, {
    ...post,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    comment_ids: [],
    votes: 0,
    voter_ids: [],
  });
};

export const deletePostById = async (id: string) => {
  const docRef = doc(db, "posts", id);
  return await deleteDoc(docRef);
};
