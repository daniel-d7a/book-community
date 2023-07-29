import { auth } from "../auth/auth";
import { db } from "./database";
import { Community, communitySchema } from "../../../Types/Communities";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

const communitiesCollectionRef = collection(db, "communities");

export async function createCommunity(community: Community) {
  if (!community) throw new Error("community is empty");
  if (communitySchema.safeParse(community).success === false)
    throw new Error("community must be a valid Community object");
  return (await addDoc(communitiesCollectionRef, community)).id;
}

export async function getUserCommunities(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  

}
