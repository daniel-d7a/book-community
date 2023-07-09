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

const postsCollectionRef = collection(db, "posts");

export async function getAllPosts() {
  const q = query(postsCollectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}

export async function getPostById(id) {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

export const createPost = async (post) => {
  console.log("post from api", post);
  return await addDoc(postsCollectionRef, {
    ...post,
    created_at: Timestamp.now(),
    user_id: auth.currentUser.uid,
    comment_ids: [],
    votes: 0,
    voter_ids : [],
  });
};

export const deletePostById = async (id) => {
  const docRef = doc(db, "posts", id);
  return await deleteDoc(docRef);
};
