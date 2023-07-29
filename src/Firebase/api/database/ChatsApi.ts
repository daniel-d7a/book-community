import { collection, getDocs, query } from "firebase/firestore";

import { db } from "./database";
import { auth } from "../auth/auth";
import { ApiChat } from "../../../Types/Chat";

const chatsCollectionRef = collection(db, "chats");

export async function getUserChats(): Promise<ApiChat[]> {
  const q = query(chatsCollectionRef);
  const querySnapshot = await getDocs(q);
  const chatsData: ApiChat[] = querySnapshot.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as ApiChat;
    })
    .filter((doc) =>
      doc.user_ids.includes(auth.currentUser?.uid ? auth.currentUser?.uid : "")
    );

  return await Promise.all(
    chatsData.map(async (singleChat) => {
      console.log("chat data", singleChat);
      return { ...singleChat } as ApiChat;
    })
  );
}
