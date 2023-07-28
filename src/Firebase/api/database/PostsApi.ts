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
  arrayUnion,
  updateDoc,
  increment,
  arrayRemove,
} from "firebase/firestore";

import { db } from "./database";
import { auth } from "../auth/auth";
import { ApiPost, Post } from "../../../Types/Posts";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./database";

const postsCollectionRef = collection(db, "posts");

/**
 * Retrieves all posts from the API.
 *
 * @return {Promise<ApiPost[]>} A promise that resolves to an array of ApiPost objects.
 */
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

/**
 * Retrieves the posts of a user from the API.
 *
 * @param {string} userId - The ID of the user whose posts will be retrieved.
 * @return {Promise<ApiPost[]>} A promise that resolves to an array of ApiPost objects representing the user's posts.
 */
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

/**
 * Retrieves a post from the API by its ID.
 *
 * @param {string} id - The ID of the post.
 * @return {Promise<ApiPost>} A promise that resolves to the retrieved post.
 */
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

/**
 * Creates a new post.
 *
 * @param {Post} post - The post object containing the details of the post.
 * @return {Promise<string>} A Promise that resolves to the ID of the newly created post.
 */
export async function createPost(post: Post): Promise<string> {
  console.log("post from api", post);

  const newPostId = await addDoc(postsCollectionRef, {
    text: post.text,
    created_at: Timestamp.now(),
    user_id: auth?.currentUser?.uid,
    comment_ids: [],
    votes: 0,
    voter_ids: [],
  });

  console.log("doc added", newPostId.id);

  const { images } = post;

  const urls = await Promise.all(
    images.map(async (image) => {
      const postImageStorageRef = ref(
        storage,
        `posts/${newPostId.id}/${image.name}`
      );
      await uploadBytes(postImageStorageRef, image);
      return await getDownloadURL(postImageStorageRef);
    })
  );

  console.log("urls", urls);

  await updateDoc(doc(db, "posts", newPostId.id), {
    images: urls,
  });

  console.log("doc updated");

  return newPostId.id;
}

/**
 * Creates a new post.
 *
 * @param {Post} post - The post object containing the details of the post.
 * @return {Promise<string>} A Promise that resolves to the ID of the newly created post.
 */
export async function deletePostById(id: string): Promise<void> {
  const docRef = doc(db, "posts", id);
  return await deleteDoc(docRef);
}

/**
 * Vote on a post.
 *
 * @param {string} id - The ID of the post.
 * @param {"up" | "down"} vote - The type of vote ("up" or "down").
 * @return {Promise<void>} Promise that resolves when the vote is successfully recorded.
 */
export async function votePost(id: string, vote: "up" | "down"): Promise<void> {
  const docRef = doc(db, "posts", id);
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
